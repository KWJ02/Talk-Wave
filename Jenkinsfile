pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/KWJ02/talk-wave'
            }
        }

        // stage('npm install') {
        //     steps {
        //         sh 'npm install'
        //     }
        // }

        // stage('npm run build') {
        //     steps {
        //         sh 'npm run build'
        //     }
        // }

        // stage('remove old dist') {
        //     steps {
        //         sh 'docker exec -it --user root talkwave-app rm -rf /usr/share/nginx/web/dist'
        //     }
        // }

        // stage('Copy ') {
        //     steps {
        //         sh 'docker cp /var/jenkins_home/workspace/talkwave_app/dist talkwave-app:/usr/share/nginx/web/dist'
        //     }
        // }
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
