import { Local } from './local';

export const Fr: Local = {
  language: 'fr',
  app: {
    navigation: {
      dashboard: 'Tableau de bord',
      employees: 'Employés',
      library: 'Bibliothèqu',
      products: 'Produits'
    },
    employees: {
      table: {
        name: 'Nom',
        email: 'E-mail',
        createdAt: 'Créé à'
      },
      action: {
        edit: 'Modifier',
        delete: 'Supprimer',
        save: 'Enregistrer',
        cancel: 'Annuler',
        addEmployee: 'Ajouter un employé'
      }
    }
  }
};
