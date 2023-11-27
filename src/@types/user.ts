export interface LoginResponse {
  logged: boolean
  pseudo: string
  token:Token
}

export interface Token {
  user: User
  token: string
}
export interface User {
  id: number
  nom: string
  prenom: string
  email: string
  tel: string
  role: string
  password: string
  date_creation: string
  last_activity: string
  logo: string | null
  statut: string
  session_id: string | null
  created_at: string
  updated_at: string
}
