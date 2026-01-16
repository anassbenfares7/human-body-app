import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: 'What is the main function of the heart?',
      options: ['Pump blood', 'Filter blood', 'Transport oxygen', 'All of the above'],
      correct: 0
    },
    {
      id: 2,
      question: 'How many chambers does the heart have?',
      options: ['2', '3', '4', '6'],
      correct: 1
    },
    {
      id: 3,
      question: 'What system does the heart belong to?',
      options: ['Nervous', 'Digestive', 'Circulatory', 'Respiratory'],
      correct: 2
    },
    {
      id: 4,
      question: 'Approximately how many times does the heart beat per day?',
      options: ['10,000', '50,000', '100,000', '1,000,000'],
      correct: 0
    },
    {
      id: 5,
      question: 'What is the approximate weight of the human heart?',
      options: ['200-250g', '250-300g', '300-350g', '350-400g'],
      correct: 1
    }
  ];

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anatomy Quiz</Text>
        <Text style={styles.score}>Score: {score}/{questions.length}</Text>
        <TouchableOpacity onPress={resetQuiz} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
        <Text style={styles.question}>
          {questions[currentQuestion]?.question}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {questions[currentQuestion]?.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              currentQuestion === questions.length - 1 && questions[currentQuestion]?.correct === index && styles.correctOption
            ]}
            onPress={() => handleAnswer(index)}
            disabled={currentQuestion === questions.length - 1}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentQuestion === questions.length && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            You scored {score} out of {questions.length}
          </Text>
          <TouchableOpacity onPress={resetQuiz} style={styles.playAgainButton}>
            <Text style={styles.playAgainButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: '#4ade80',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  resultContainer: {
    backgroundColor: '#4ade80',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  resultScore: {
    fontSize: 18,
    color: 'white',
  },
  playAgainButton: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  playAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
