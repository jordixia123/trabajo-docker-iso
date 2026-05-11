pipeline {
    agent any

    environment {
        APP_NAME = "api-docker-ci"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    docker compose build
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose down -v || true
                    docker compose up -d --build
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "No tests configurados aún"
                    # aquí puedes poner: npm test o curl al backend
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminado'
        }

        success {
            echo 'Deploy OK'
        }

        failure {
            echo 'Pipeline falló'
        }
    }
}