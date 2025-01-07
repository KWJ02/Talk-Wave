pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/KWJ02/talk-wave'
            }
        }

        stage('Copy .env') {
            steps {
                sh 'cp /var/jenkins_home/app/env/.env.talkwave /var/jenkins_home/workspace/talkwave-app/.env'
            }
        }

       stage('Build') {
            steps {
                dir('/var/jenkins_home/workspace/talkwave-app') {
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('remove old dist') {
            steps {
                sh 'docker exec --user root talkwave-app rm -rf /usr/share/nginx/web/dist'
            }
        }

        stage('Copy dist') {
            steps {
                sh 'docker cp /var/jenkins_home/workspace/talkwave-app/dist talkwave-app:/usr/share/nginx/web/dist'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
