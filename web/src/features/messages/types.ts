export interface SmsTemplate {
  id: string
  key: string
  name: string
  body: string
  variables: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface SmsLog {
  id: string
  userId: string | null
  phone: string
  message: string
  template: string | null
  status: string
  sentAt: string | null
  createdAt: string
  user: {
    id: string
    phone: string
    firstName: string | null
    lastName: string | null
  } | null
}

export interface UpdateTemplateBody {
  name?: string
  body?: string
  variables?: string[]
  isActive?: boolean
}

export interface SendSmsBody {
  phone: string
  message: string
  template?: string
}

export interface RecoverBody {
  hours: number
  maxMessages: number
}
