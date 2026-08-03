pipeline {
    agent any

    environment {
        PYTHON = 'python3'
    }

    stages {

        stage('Environment Check') {
            steps {
                sh '${PYTHON} --version'
                sh '${PYTHON} -m pip --version'
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Backend Setup') {
            steps {
                dir('backend') {
                    sh '${PYTHON} -m pip install --upgrade pip'
                    sh '${PYTHON} -m pip install -r requirements.txt'
                }
            }
        }

        stage('Frontend Setup') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Validation') {
            steps {
                dir('backend') {
                    sh '${PYTHON} -m py_compile app.py'
                }
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
            cleanWs()
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