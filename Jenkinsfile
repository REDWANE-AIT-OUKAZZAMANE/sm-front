def COMMIT_HASH
def CONTAINER_REGISTRY = 'registry.gitlab.com/xhub-org/p/social-media-wall/sm-front'
pipeline {
    agent any
    options {
        gitLabConnection('Gitlab')
    }
    triggers {
        gitlab(
                triggerOnPush: true,
                triggerOnMergeRequest: true,
                branchFilterType: 'All',
                triggerOnNoteRequest: true,
                noteRegex: 'Jenkins please retry a build',
                addNoteOnMergeRequest: true,
                setBuildDescription: true,
                addCiMessage: true,
                addVoteOnMergeRequest: true)
    }
    environment {
        APP_URL = 'https://smwall.dev.x-hub.io/'
    }
    stages {
        stage('Build project') {
            agent {
                docker {
                    image 'node:14'
                    args "-u 0:0 -v ${WORKSPACE}:/app -w /app"
                    reuseNode true
                }
            }
            steps {
                sh 'yarn install'
                script {
                    if ((env.GIT_BRANCH =~ '.*master.*').matches()) {
                        selectEnv()
                    } else {
                          sh 'API_URL=/api npm run build'
                    }
                }
            }
        }

        stage('Build image') {
            when {
                expression { return !(env.GIT_BRANCH =~ '^origin/.*').matches() || ((env.GIT_BRANCH =~ 'origin/develop').matches()) }
            }
            steps {
                echo 'Starting to build docker image'
                script {
                    COMMIT_HASH = sh(returnStdout: true, script: 'git rev-parse HEAD').trim().take(7)
                    def projectImage = docker.build("${CONTAINER_REGISTRY}")
                }
            }
        }

        stage('Push Image') {
            when {
                expression { return (!(env.GIT_BRANCH =~ '^origin/.*').matches() && !(env.GIT_BRANCH =~ '.*master.*').matches()) || ((env.GIT_BRANCH =~ 'origin/develop').matches()) }
            }
            steps {
                withCredentials([usernamePassword(
                        credentialsId: 'registry',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                )]) {
                    sh "echo $PASS | docker login registry.gitlab.com -u $USER --password-stdin"
                }

                sh "docker tag ${CONTAINER_REGISTRY}:latest ${CONTAINER_REGISTRY}:${COMMIT_HASH}"
                sh "docker push ${CONTAINER_REGISTRY}:latest"
                sh "docker push ${CONTAINER_REGISTRY}:${COMMIT_HASH}"
            }
        }

        stage('Release') {
            when {
                expression { return (env.GIT_BRANCH =~ '.*master.*').matches() }
            }

            steps {
                releaseCurrentVersion()
            }
        }

        stage('Deploy') {
            when {
                expression { return (!(env.GIT_BRANCH =~ '^origin/.*').matches() && !(env.GIT_BRANCH =~ '.*master.*').matches()) || ((env.GIT_BRANCH =~ 'origin/develop').matches()) }
            }

            steps {
                withCredentials([usernamePassword(
                        credentialsId: 'registry',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                )]) {
                    sh """
                if [ ! -d "/tmp/deploy" ] ; then
                    git clone git@gitlab.com:xhub-org/p/tooling/deploy-playbooks.git /tmp/deploy
                else
                    cd /tmp/deploy
                    git pull
                fi
                ansible-playbook /tmp/deploy/smwall/site.yml -i /tmp/deploy/inventory/dev --extra-vars "profile=dev img_version=${COMMIT_HASH} registry_password=$PASS registry_user=$USER"
            """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            script {
                if ((env.GIT_BRANCH =~ '.*develop.*|.*master.*').matches()) {
                    // slackSend(channel: 'm2t-refonte-es', color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                } else {
                    addGitLabMRComment comment: ":no_entry_sign: Jenkins Build FAILURE\n\nResults available at: [Jenkins [$env.JOB_NAME#$env.BUILD_NUMBER]]($env.BUILD_URL)"
                    updateGitlabCommitStatus name: 'build', state: 'failed'
                }
            }
        }
        success {
            script {
                if ((env.GIT_BRANCH =~ '.*develop.*|.*master.*').matches()) {
                    // slackSend(channel: 'm2t-refonte-es', color: '#008000', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                } else {
                    addGitLabMRComment comment: ":white_check_mark: Jenkins Build SUCCESS\n\nResults available at: [Jenkins [$env.JOB_NAME#$env.BUILD_NUMBER]]($env.BUILD_URL)"
                    updateGitlabCommitStatus name: 'build', state: 'success'
                }
            }
        }

        aborted {
            addGitLabMRComment comment: ":point_up: Jenkins Build ABORTED\n\nResults available at: [Jenkins [$env.JOB_NAME#$env.BUILD_NUMBER]]($env.BUILD_URL)"
            updateGitlabCommitStatus name: 'build', state: 'canceled'
        }
        unstable {
            addGitLabMRComment comment: ":warning: Jenkins Build UNSTABLE\n\nResults available at: [Jenkins [$env.JOB_NAME#$env.BUILD_NUMBER]]($env.BUILD_URL)"
            updateGitlabCommitStatus name: 'build', state: 'failed'
        }
    }
}

def releaseCurrentVersion() {
    input 'Are you sure to Release ?'
    def releaseVersion = input id: 'releaseVersionID', message: 'Specify version', parameters: [string(defaultValue: '', description: 'write version like M.m.p ex: 1.0.0', name: 'Release Version! Leave empty to disable release')]
    if (releaseVersion?.trim()) {
        prepareAndDeploy(releaseVersion)
    } else {
        echo 'Release Aborted! No specified Release Version'
    }
}

def prepareAndDeploy(newVersion) {
    def CONTAINER_REGISTRY = 'registry.gitlab.com/xhub-org/p/xtimesheet/frontend'
    echo '######### deploy To Registry'

    sh "docker tag ${CONTAINER_REGISTRY}:latest ${CONTAINER_REGISTRY}:${newVersion}-${env.TARGET}"
    sh "docker push ${CONTAINER_REGISTRY}:${newVersion}-${env.TARGET}"
    echo '########## branching Tag'

    sh "git tag -a \"${newVersion}-${env.TARGET}\" -m \"Tagging version ${newVersion}-${env.TARGET}\""

    sh 'git push --tags'
}

def selectEnv() {
    env.TARGET = input message: 'please select target deployment env', parameters: [choice(name: 'targetEnv', choices: 'dev\nqa\nprod\n', description: 'Target deployment env')]
    switch (env.TARGET) {
        default:
            sh 'API_URL=/api npm run build'
            return
    }
}
