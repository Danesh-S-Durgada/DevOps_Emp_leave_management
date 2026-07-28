pipeline {
    agent any

    stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
                url: 'https://github.com/Danesh-S-Durgada/DevOps_Emp_leave_management.git'
        }
    }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    bat 'pip install -r requirements.txt'
                }
            }
        }

        stage('Frontend Setup') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('backend') {
                    bat 'start python app.py'
                }
            }
        }

        stage('Run Frontend') {
            steps {
                dir('frontend') {
                    bat 'start npm run dev'
                }
            }
        }
    }
}