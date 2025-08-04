// components/quiz-judgment-question/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 可以通过父组件传入题目数据
    questionData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 判断对错题
    questions: [
      {
        id: 1,
        text: "1.鞘内泵植入术前需进行体位训练。",
        options: {
          A: "√",
          B: "×",
        },
        correctAnswer: "A",
        userAnswer: null,
      },
      {
        id: 2,
        text: "2.癌痛治疗以药物治疗为主、非药物治疗为辅。",
        options: {
          A: "√",
          B: "×",
        },
        correctAnswer: "A",
        userAnswer: null,
      },
      {
        id: 3,
        text: "3.对于癌痛治疗，以阿片类药物为基础的三阶梯药物治疗不是最常用的方式。",
        options: {
          A: "√",
          B: "×",
        },
        correctAnswer: "B",
        userAnswer: null,
      },
      {
        id: 4,
        text: "4.焦虑症，又称为焦虑性神经症，以焦虑情绪体验为主要特征。主要表现为：无明确客观对象的紧张担心，坐立不安，还有植物神经症状如:心悸、手抖、出汗、尿频等。",
        options: {
          A: "√",
          B: "×",
        },
        correctAnswer: "A",
        userAnswer: null,
      },
      {
        id: 5,
        text: "5.情绪常和心情、性格、脾气、目的等因素互相作用，也受到荷尔蒙和神经传导物质影响。",
        options: {
          A: "√",
          B: "×",
        },
        correctAnswer: "A",
        userAnswer: null,
      },
    ],
    currentQuestionIndex: 0, // 当前题目索引
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 用户选择答案
     */
    selectAnswer(e) {
      const { option } = e.currentTarget.dataset;
      const currentIndex = this.data.currentQuestionIndex;
      const questions = this.data.questions;
      const currentQuestion = questions[currentIndex];

      // 更新用户答案
      questions[currentIndex].userAnswer = option;
      
      this.setData({
        questions: questions
      });

      // 检查答案是否正确
      this.checkAnswer(currentQuestion, option);
    },

    /**
     * 检查答案
     */
    checkAnswer(question, userAnswer) {
      if (userAnswer === question.correctAnswer) {
        wx.showToast({
          title: '恭喜您 答对了',
          icon: 'success',
          duration: 1000
        });
      } else {
        wx.showToast({
          title: '回答错误',
          icon: 'error',
          duration: 1000
        });
      }
    },

    /**
     * 下一题
     */
    nextQuestion() {
      const currentIndex = this.data.currentQuestionIndex;
      const totalQuestions = this.data.questions.length;
      
      if (currentIndex < totalQuestions - 1) {
        this.setData({
          currentQuestionIndex: currentIndex + 1
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '已完成所有题目！',
          showCancel: false
        });
      }
    },

    /**
     * 上一题
     */
    prevQuestion() {
      const currentIndex = this.data.currentQuestionIndex;
      
      if (currentIndex > 0) {
        this.setData({
          currentQuestionIndex: currentIndex - 1
        });
      }
    },

    /**
     * 重置当前题目答案
     */
    resetAnswer() {
      const currentIndex = this.data.currentQuestionIndex;
      const questions = this.data.questions;
      
      questions[currentIndex].userAnswer = null;
      
      this.setData({
        questions: questions
      });
    }
  },

  /**
   * 组件生命周期函数
   */
  lifetimes: {
    attached() {
      // 如果有传入的题目数据，则使用传入的数据
      if (this.properties.questionData && this.properties.questionData.length > 0) {
        this.setData({
          questions: this.properties.questionData
        });
      }
    }
  }
});
