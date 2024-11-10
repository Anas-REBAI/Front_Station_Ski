pipeline {
    agent any
  

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('DockerHubCredentials')
        DOCKER_IMAGE = 'front-stationski'  
        // Utilisation du hash du commit Git comme tag d'image unique
        IMAGE_TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
    }

    stages {

        stage('Checkout GIT') {
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
        
        stage('Docker Build FrontEnd Image') {
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

        stage('Deploy Frontend') {
            agent { label 'agent01' }
            steps {
                script {
                // Accessing the deployment_front.yaml and applying it
                echo "Deploying frontend application using deployment_front.yaml."
                sh '''
                    kubectl set image deployment/station-ski-app-front frontend=$DOCKER_USERNAME/$DOCKER_IMAGE:$IMAGE_TAG
                    kubectl apply -f deploy.yml
                '''
                }
            }
        }

    }

    post {
        success {
            echo 'Pipeline succeeded!'
            // Actions à exécuter en cas de succès
        }

        failure {
            echo 'Pipeline failed!'
            // Actions à exécuter en cas d'échec
        }

        always {
            echo 'Pipeline has finished execution'
            // Actions à exécuter, qu'il y ait succès ou échec
        }
    }
}