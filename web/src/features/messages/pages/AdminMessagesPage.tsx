import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MessageSquare, Send, RefreshCcw, Clock, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  getSmsTemplates,
  updateSmsTemplate,
  sendSms,
  recoverAbandonedCarts,
  getSmsLogs,
} from '../api'
import type { SmsTemplate } from '../types'

type Tab = 'templates' | 'send' | 'recover' | 'logs'

export function AdminMessagesPage() {
  const [tab, setTab] = useState<Tab>('templates')
  const queryClient = useQueryClient()

  const { data: templatesData, isLoading: templatesLoading } = useQuery({
    queryKey: ['sms-templates'],
    queryFn: getSmsTemplates,
  })

  const { data: logsData, isLoading: logsLoading } = useQuery({
    queryKey: ['sms-logs'],
    queryFn: () => getSmsLogs({ take: 50 }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ key, body }: { key: string; body: Partial<SmsTemplate> }) =>
      updateSmsTemplate(key, body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sms-templates'] }),
  })

  const sendMutation = useMutation({
    mutationFn: sendSms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sms-logs'] })
      alert('پیامک آزمایشی ارسال شد')
    },
  })

  const recoverMutation = useMutation({
    mutationFn: recoverAbandonedCarts,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['sms-logs'] })
      alert(`اسکن شد: ${result.scanned} | ارسال شد: ${result.sent}`)
    },
  })

  const [sendForm, setSendForm] = useState({ phone: '', message: '', template: '' })
  const [recoverForm, setRecoverForm] = useState({ hours: 24, maxMessages: 50 })

  const tabs: { key: Tab; label: string; icon: typeof MessageSquare }[] = [
    { key: 'templates', label: 'قالب‌ها', icon: FileText },
    { key: 'send', label: 'ارسال آزمایشی', icon: Send },
    { key: 'recover', label: 'بازیابی سبد', icon: RefreshCcw },
    { key: 'logs', label: 'لاگ پیامک‌ها', icon: Clock },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">پیامک و اعلانات</h1>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium ${
              tab === t.key
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-foreground'
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'templates' && (
        <div className="space-y-4">
          {templatesLoading ? (
            <p className="text-gray-500">در حال بارگذاری ...</p>
          ) : (
            templatesData?.templates.map((template) => (
              <TemplateEditor
                key={template.key}
                template={template}
                onSave={(body) => updateMutation.mutate({ key: template.key, body })}
              />
            ))
          )}
        </div>
      )}

      {tab === 'send' && (
        <form
          className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-background p-6"
          onSubmit={(e) => {
            e.preventDefault()
            sendMutation.mutate(sendForm)
          }}
        >
          <h2 className="text-lg font-semibold">ارسال پیامک آزمایشی</h2>
          <div>
            <label className="mb-1 block text-sm text-gray-600">شماره موبایل</label>
            <Input
              value={sendForm.phone}
              onChange={(e) => setSendForm({ ...sendForm, phone: e.target.value })}
              placeholder="۰۹۱۲xxxxxxx"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">قالب (اختیاری)</label>
            <select
              value={sendForm.template}
              onChange={(e) => setSendForm({ ...sendForm, template: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
            >
              <option value="">بدون قالب</option>
              {templatesData?.templates.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">متن پیام</label>
            <textarea
              value={sendForm.message}
              onChange={(e) => setSendForm({ ...sendForm, message: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              required
            />
          </div>
          <Button type="submit" disabled={sendMutation.isPending}>
            ارسال
          </Button>
        </form>
      )}

      {tab === 'recover' && (
        <form
          className="mx-auto max-w-xl space-y-4 rounded-xl border border-border bg-background p-6"
          onSubmit={(e) => {
            e.preventDefault()
            recoverMutation.mutate(recoverForm)
          }}
        >
          <h2 className="text-lg font-semibold">بازیابی سبد خرید رها شده</h2>
          <p className="text-sm text-gray-600">
            به کاربرانی که سبد خرید فعال آن‌ها بیش از مدت مشخص شده بلااستفاده مانده، پیامک ارسال
            می‌شود.
          </p>
          <div>
            <label className="mb-1 block text-sm text-gray-600">ساعت گذشته از آخرین به‌روزرسانی</label>
            <Input
              type="number"
              min={1}
              max={72}
              value={recoverForm.hours}
              onChange={(e) => setRecoverForm({ ...recoverForm, hours: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">حداکثر تعداد ارسال</label>
            <Input
              type="number"
              min={1}
              max={100}
              value={recoverForm.maxMessages}
              onChange={(e) =>
                setRecoverForm({ ...recoverForm, maxMessages: Number(e.target.value) })
              }
              required
            />
          </div>
          <Button type="submit" disabled={recoverMutation.isPending}>
            اجرای بازیابی
          </Button>
        </form>
      )}

      {tab === 'logs' && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-right">زمان</th>
                <th className="px-4 py-3 text-right">گیرنده</th>
                <th className="px-4 py-3 text-right">قالب</th>
                <th className="px-4 py-3 text-right">وضعیت</th>
                <th className="px-4 py-3 text-right">متن</th>
              </tr>
            </thead>
            <tbody>
              {logsLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    در حال بارگذاری ...
                  </td>
                </tr>
              ) : (
                logsData?.logs.map((log) => (
                  <tr key={log.id} className="border-t border-border">
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {new Date(log.createdAt).toLocaleString('fa-IR')}
                    </td>
                    <td className="px-4 py-3">{log.phone}</td>
                    <td className="px-4 py-3">{log.template ?? '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          log.status === 'SENT'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.status === 'SENT' ? 'ارسال شده' : log.status}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3" title={log.message}>
                      {log.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function TemplateEditor({
  template,
  onSave,
}: {
  template: SmsTemplate
  onSave: (body: Partial<SmsTemplate>) => void
}) {
  const [body, setBody] = useState(template.body)
  const [isActive, setIsActive] = useState(template.isActive)

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">
          {template.name} <span className="text-xs text-gray-500">({template.key})</span>
        </h3>
        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary"
          />
          فعال
        </label>
      </div>
      <p className="mb-2 text-xs text-gray-500">
        متغیرها: {template.variables.length > 0 ? template.variables.join(', ') : 'ندارد'}
      </p>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
      />
      <div className="mt-2 flex justify-end">
        <Button
          type="button"
          size="sm"
          onClick={() => onSave({ body, isActive })}
        >
          ذخیره
        </Button>
      </div>
    </div>
  )
}
