export interface Root {
  coaches: Coach[]
  equipes: Equipe2[]
  categories: Category[]
  joueurs: Joueur[]
}

export interface Coach {
  id: number
  nom: string
  prenom: string
  email: string
  tel: string
  role: string
  mot_de_passe: string
  date_creation: string
  last_activity: string
  logo: string
  equipes: Equipe[]
  statut: string
}

export interface Equipe {
  id: number
  nom: string
  logo: string
  categorie: Categorie
  seance: Seance
  statut: string
}

export interface Categorie {
  id: number
  nom: string
}

export interface Seance {
  id: number
  date: string
  heure: string
  lieu: string
  joueurs_present: JoueursPresent[]
  joueurs_absents: JoueursAbsent[]
  joueurs_retard: JoueursRetard[]
  statut: string
}

export interface JoueursPresent {
  id: number
  nom: string
  prenom: string
}

export interface JoueursAbsent {
  id: number
  nom: string
  prenom: string
}

export interface JoueursRetard {
  id: number
  nom: string
  prenom: string
}

export interface Equipe2 {
  id: number
  nom: string
  logo: string
  categorie: Categorie2
  seance: Seance2
  statut: string
}

export interface Categorie2 {
  id: number
  nom: string
}

export interface Seance2 {
  id: number
  date: string
  heure: string
  lieu: string
  joueurs_present: JoueursPresent2[]
  joueurs_absents: JoueursAbsent2[]
  joueurs_retard: JoueursRetard2[]
  statut: string
}

export interface JoueursPresent2 {
  id: number
  nom: string
  prenom: string
}

export interface JoueursAbsent2 {
  id: number
  nom: string
  prenom: string
}

export interface JoueursRetard2 {
  id: number
  nom: string
  prenom: string
}

export interface Category {
  id: number
  nom: string
  date_creation: string
  statut: string
  tranche_age: string
  nombre_total: number
}

export interface Joueur {
  id: number
  nom: string
  prenom: string
  email: string
  tel: string
  categorie: Categorie3
  derniere_activite: string
  date_creation: string
  equipe: Equipe3
  statut: string
  logo: string
  nom_prenom_tel_parent: string
  total_presence: number
  dates_heures_absence: DatesHeuresAbsence[]
  mot_de_passe: string
  role: string
  age: number
  etat: string
  nombre_total_joueur: number
}

export interface Categorie3 {
  id: number
  nom: string
}

export interface Equipe3 {
  id: number
  nom: string
  categorie?: Categorie4
}

export interface Categorie4 {
  id: number
  nom: string
}

export interface DatesHeuresAbsence {
  date: string
  heure: string
}
