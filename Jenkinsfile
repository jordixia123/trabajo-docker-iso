pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/jordixia123/trabajo-docker-iso'
            }
        }

        stage('Debug') {
            steps {
                sh 'pwd'
                sh 'find .'
                sh 'ls -l nginx'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Test') {
            steps {
                sh 'docker compose ps'
            }
        }
    }
}