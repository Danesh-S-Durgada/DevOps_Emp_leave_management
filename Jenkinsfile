pipeline {
    agent any

    stages {

        stage('Environment Check') {
            steps {
                bat 'where python'
                bat 'python --version'
                bat 'python -m pip --version'
                bat 'where node'
                bat 'node --version'
                bat 'where npm'
                bat 'npm --version'
            }
        }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    bat 'python -m pip install --upgrade pip'
                    bat 'python -m pip install -r requirements.txt'
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

        stage('Backend Validation') {
            steps {
                dir('backend') {
                    bat 'python -m py_compile app.py'
                }
            }
        }
    }

    post {
        success {
            echo '====================================='
            echo 'BUILD SUCCESSFUL'
            echo 'Employee Leave Management CI Passed'
            echo '====================================='
        }

        failure {
            echo '====================================='
            echo 'BUILD FAILED'
            echo 'Check Console Output for details'
            echo '====================================='
        }

        always {
            cleanWs()
        }
    }
}