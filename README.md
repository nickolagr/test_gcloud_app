# Test AWS + GCP CI/CD project

Here was used existing project (as base app) https://github.com/dannibla/nodejs-postgresql-crud

In this project set CI/CD cycle in AWS cloud (using CodeDeploy (appspec.yml) to automate project) and in GCP cloud as well (with Cloud Build service (cloudbuild.yaml)

The cycle is the next - we have the app on Node.js + PostgreSQL DB.

The code is saved in GitHub repository. DB is running separatedly on some compute instance and application serves on some PaaS (AppEngine or EC2 instance).

Here set pipeline to re-deploy application if new commit in repository had been pushed and approved
