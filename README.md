pipeline {
agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/your-username/leave-management-system.git'
            }
        }

        stage('Deploy') {
            steps {
                sh 'chmod +x scripts/deploy.sh'
                sh './scripts/deploy.sh'
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }

}
