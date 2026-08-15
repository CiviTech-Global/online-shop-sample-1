import { apiRequest } from '@/api/client'
import type {
  SmsTemplate,
  SmsLog,
  UpdateTemplateBody,
  SendSmsBody,
  RecoverBody,
} from './types'

export function getSmsTemplates(): Promise<{ templates: SmsTemplate[] }> {
  return apiRequest<{ templates: SmsTemplate[] }>('/messages/templates')
}

export function updateSmsTemplate(
  key: string,
  body: UpdateTemplateBody,
): Promise<{ template: SmsTemplate }> {
  return apiRequest<{ template: SmsTemplate }>(`/messages/templates/${encodeURIComponent(key)}`, {
    method: 'PATCH',
    body,
  })
}

export function sendSms(body: SendSmsBody): Promise<{ sent: boolean; log: SmsLog }> {
  return apiRequest<{ sent: boolean; log: SmsLog }>('/messages/send', {
    method: 'POST',
    body,
  })
}

export function recoverAbandonedCarts(
  body: RecoverBody,
): Promise<{ scanned: number; sent: number }> {
  return apiRequest<{ scanned: number; sent: number }>('/messages/abandoned-cart/recover', {
    method: 'POST',
    body,
  })
}

export function getSmsLogs(query?: {
  take?: number
  skip?: number
}): Promise<{ logs: SmsLog[]; pagination: { total: number; take: number; skip: number } }> {
  const params = new URLSearchParams()
  if (query?.take !== undefined) params.set('take', String(query.take))
  if (query?.skip !== undefined) params.set('skip', String(query.skip))
  const qs = params.toString()
  return apiRequest<{ logs: SmsLog[]; pagination: { total: number; take: number; skip: number } }>(
    `/messages/logs${qs ? `?${qs}` : ''}`,
  )
}
