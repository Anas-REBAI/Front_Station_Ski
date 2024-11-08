pipeline {
    agent {label 'agent01'}
  

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('DockerHubCredentials')
        DOCKER_IMAGE = 'Front-StationSki'  
        IMAGE_TAG = 'latest' 
    }

    stages {

        stage('Check FrontEnd') {
            agent { label 'agent01' }
            steps {
                script {
                    def gitStatus = sh(script: 'git ls-remote https://github.com/Anas-REBAI/Front_Station_Ski.git', returnStatus: true)
                    if (gitStatus != 0) {
                        error("Failed to access Git repository")
                    }
                }
                git branch: 'master', url: 'https://github.com/Anas-REBAI/Front_Station_Ski.git'
            }
        }

        stage('Build FrontEnd') {
            agent { label 'agent01' }
            steps {
                sh 'npm install'
                sh 'ng build'
            }
        }
        
        stage('Docker Build FrontEnd') {
            agent { label 'agent01' }
            steps {
                script {
                    // Build Docker image for frontend
                    sh 'docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} .'
                }
            }
        }

        stage('Push Frontend Docker Image to Docker Hub') {
            agent { label 'agent01' }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DockerHubCredentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        retry(3) { // Retry up to 3 times
                            // Login to Docker Hub test
                            sh script: 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin', returnStdout: true
                            
                            // Tag the Docker image
                            sh 'docker tag ${DOCKER_IMAGE}:${IMAGE_TAG} $DOCKER_USERNAME/${DOCKER_IMAGE}:${IMAGE_TAG}'
                            
                            // Push the Docker image
                            sh 'docker push $DOCKER_USERNAME/${DOCKER_IMAGE}:${IMAGE_TAG}'
                        }
                    }
                }
            }
        }

        // stage('Deploy Frontend with K8S Manifest') {
        //     agent { label 'agent01' }
        //     steps {
        //         script {
        //         // Accessing the deployment_front.yaml and applying it
        //         echo "Deploying frontend application using deployment_front.yaml."
        //         sh '''
        //             kubectl apply -f /home/vagrant/jenkins-agent2/workspace/5Arctic-G1-SKI-Backend/manifest_files/deploy_frontend.yml
        //         '''
        //         }
        //     }
        // }

    }

    post {
        success {
            script {
                // Send a success message to Slack with image name and tag test
                slackSend(channel: '#jenkins-messg', 
                          message: "Le build de pipeline Frontend a réussi : ${env.JOB_NAME} #${env.BUILD_NUMBER} ! Image pushed: ${DOCKER_IMAGE}:${IMAGE_TAG} successfully.")
            }
        }
        failure {
            script {
                // Send a failure message to Slack
                slackSend(channel: '#jenkins-messg', 
                          message: "Le build de pipeline Frontend a échoué : ${env.JOB_NAME} #${env.BUILD_NUMBER}.")
            }
        }
    }
}