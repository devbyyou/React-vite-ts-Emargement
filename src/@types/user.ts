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
  date_creation: string | number
  last_activity: string
  logo: string
  statut: string
  session_id: string | null
  created_at: string
  updated_at: string
  equipes: Equipe[]
  banniere: string,
}
export interface Equipe {
  created_at: string
  id: number
  nom: string
  logo?: string
  statut: string
  categorie_id: number
  joueurs: Joueur[]
  categories: Categories
  coaches_equipes: CoachesEquipes
}
export interface Joueur {
  categorie_id: any
  id: number
  nom: string
  prenom: string
  email: string
  derniere_activite: string | number
}

export interface Categories {
  id: number
  nom: string
  tranche_age: string
  nombre_total: number
}

export interface CoachesEquipes {
  created_at: string
  updated_at: string
  coach_id: number
  equipe_id: number
}
