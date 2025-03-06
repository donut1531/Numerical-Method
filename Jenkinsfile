pipeline {
  agent {
    node {
      label 'Test'
    }

  }
  stages {
    stage('Test1') {
      steps {
        echo 'Test'
      }
    }

    stage('test2') {
      steps {
        echo 'STEP 2 Test'
      }
    }

    stage('test3') {
      steps {
        sh '//'
      }
    }

    stage('test4') {
      steps {
        echo 'FInal'
      }
    }

  }
  environment {
    test = '1'
    test2 = '2'
  }
}