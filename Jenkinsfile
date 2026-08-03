pipeline {
    agent any

    environment {
        PYTHON = "python3"
        VENV = "venv"
    }

    stages {

        stage('Environment Check') {
            steps {
                sh '''
                    python3 --version
                    python3 -m pip --version
                    node --version
                    npm --version
                '''
            }
        }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh '''
                        python3 -m venv ${VENV}
                        . ${VENV}/bin/activate

                        python -m pip install --upgrade pip
                        pip install -r requirements.txt
                    '''
                }
            }
        }

        stage('Frontend Setup') {
            steps {
                dir('frontend') {
                    sh '''
                        npm cache clean --force
                        npm install --fetch-timeout=600000 --fetch-retries=5
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Backend Validation') {
            steps {
                dir('backend') {
                    sh '''
                        . ${VENV}/bin/activate
                        python -m py_compile app.py
                    '''
                }
            }
        }

        stage('Pipeline Completed') {
            steps {
                echo 'Application Build Completed Successfully'
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESS'
        }

        failure {
            echo 'BUILD FAILED'
        }

        always {
            echo 'Workspace preserved for debugging'

        }
    }
}

// to add mail-id to get notification
// post {
//     success {
//         emailext(
//             subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//             body: """
//                 <h2>Build Successful</h2>
//                 <p>Job: ${env.JOB_NAME}</p>
//                 <p>Build Number: ${env.BUILD_NUMBER}</p>
//                 <p>Build URL: ${env.BUILD_URL}</p>
//             """,
//             to: "daneshsd2002@gmail.com"
//         )
//     }

//     failure {
//         emailext(
//             subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
//             body: """
//                 <h2>Build Failed</h2>
//                 <p>Job: ${env.JOB_NAME}</p>
//                 <p>Build Number: ${env.BUILD_NUMBER}</p>
//                 <p>Build URL: ${env.BUILD_URL}</p>
//             """,
//             to: "your-email@gmail.com"
//         )
//     }

//     always {
//         cleanWs()
//     }
// }