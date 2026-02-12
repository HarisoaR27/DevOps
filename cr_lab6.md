# Compte-rendu lab 6 : Infrastructure as Code (IaC) avec Vagrant et Ansible

**Date :** 12 février 2026  
**Étudiants :** Harisoa, Jennifer
**Sujet :** IaC (Infrastructure as Code) by provisioning virtual machines using **imperative** and **declarative** approaches

---

## **1. Objectif du lab**
### **Objectifs**
Maîtriser les concepts fondamentaux de l'Infrastructure as Code (IaC) à travers trois parties :
1. **Partie 1 - approche impérative** : Installation et utilisation de Vagrant avec Shell Provisioner pour créer et configurer une machine virtuelle CentOS 7 via des commandes shell.
2. **Partie 2 - approche déclarative** : Installation d'Ansible, ensuite installation de GitLab  sur une VM Rocky Linux 8 en utilisant Vagrant avec Ansible.
3. **Partie 3 - health checks** : Configuration des contrôles de santé (health checks) de GitLab via Ansible.
4. **Bonus** : Détection des services dysfonctionnels avec affichage personnalisé.

### **Ce que'on a appris**
- Comprendre la différence entre approches impérative et déclarative en IaC
- Utiliser Vagrant pour la gestion du cycle de vie des VMs
- Utiliser Ansible comme outil de gestion de configuration
- Implémenter des mécanismes de monitoring et health checking

---

## **2. Applications**
### **Cas d'usage concrets**
#### *2.1 Environnements de développement standardisés*
**Problème résolu :** Élimination du syndrome "ça marche sur ma machine"
- Les développeurs utilisent Vagrant pour créer des environnements de développement identiques
- Exemple : Une équipe de 50 développeurs peut instantanément provisionner un environnement de développement complet avec base de données, cache Redis, et serveur web en exécutant simplement `vagrant up`
- **Entreprises utilisatrices :** HashiCorp, GitHub, Spotify

#### *2.2 Déploiement d'infrastructure multi-environnements*
**Application :** CI/CD et déploiement automatisé
- Les playbooks Ansible permettent de déployer la même application sur dev, staging, et production avec des configurations différentes
- GitLab lui-même utilise cette approche pour ses propres déploiements
- **Cas réel :** Netflix utilise des outils similaires pour gérer des milliers de serveurs

---

## **3. Étape dans le dycle DevOps**
### *Positionnement : phase "build" et "deploy"
Ce lab couvre principalement **deux phases du cycle DevOps** :

#### *3.1 Phase BUILD (construction)*
- **Création d'artifacts d'infrastructure** : Les Vagrantfiles et playbooks Ansible sont des artifacts versionnés qui définissent l'infrastructure
- **Infrastructure as Code** : L'infrastructure est traitée comme du code, avec versioning, revue de code, et tests
- **Automatisation** : Élimination des étapes manuelles de configuration (e.g. vagrant provision - configuration automatique)
- **Reproductibilité** : Garantit que l'environnement peut être reconstruit de manière identique

**Outils du cycle BUILD présents dans le lab :**
- Vagrant (orchestration de VMs)
- Ansible (automatisation de configuration)
- Git (versioning implicite des fichiers)

#### *3.2 Phase DEPLOY (Déploiement)*
- **Provisionnement automatisé** : Déploiement de GitLab sans intervention manuelle
- **Configuration management** : Ansible configure les services (SSH, Postfix, firewall, GitLab)
- **Répétable** : Les playbooks peuvent être rejoués sans effets secondaires
- **Rollback capability** : Possibilité de revenir en arrière via `vagrant destroy` et `vagrant up`

#### *3.3 Phase MONITOR (Monitoring) - Partie 3*
- **Health Checks** : Vérification de l'état de GitLab via API
- **Service Discovery** : Détection des services dysfonctionnels
- **Alerting** : Messages personnalisés en cas de problème (bonus task)

---

## **4. Problèmes rencontrés et résolutions**
### Problème 1 : "A Vagrant environment or target machine is required to run this command"
#### Message d'erreur
```

```

#### Analyse du problème


#### Processus de résolution


---

## **5. Finalité du lab**
### **5.1 Objectifs remplis**

#### *Partie 1 : Approche impérative*
**Statut** : **RÉUSSI**

**Preuves de réalisation** :
- VM CentOS 7 créée et démarrée avec succès
- Configuration `/etc/hosts` modifiée via shell provisioner
- Fichier `/etc/vagrant_provisioned_at` créé avec date
- Commandes Vagrant maîtrisées (`up`, `destroy`, `ssh`, `provision`)

---

#### Partie 2 : Installation GitLab (déclarative)
**Statut** : **EN COURS**

**Attendu** :
- VM Rocky Linux 8 provisionnée
- GitLab CE installé et accessible sur http://localhost:8080
- Configuration automatisée via Ansible :
  - Packages système (curl, SSH, Postfix)
  - Firewall configuré (HTTP/HTTPS)
  - GitLab téléchargé, installé et configuré
  - Service démarré et opérationnel

**Validation** :
- Page de connexion GitLab accessible
- Mot de passe root récupérable dans `/etc/gitlab/initial_root_password`
- Playbook Ansible idempotent (rejouable sans erreurs)

---

#### Partie 3 : Health Checks
**Statut** : **EN COURS**


---

#### Bonus : Détection des Services Dysfonctionnels
**Statut** : ??
