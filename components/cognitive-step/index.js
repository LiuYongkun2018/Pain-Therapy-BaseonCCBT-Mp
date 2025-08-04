// components/cognitive-step/index.js
Component({
  properties: {
    steps: {
      type: Array,
      value: []
    }
  },

  data: {
    currentStepIndex: 0,      // 当前大项索引
    currentSubIndex: -1,      // 当前子项索引 (-1表示显示标题)
    displayedItems: [],       // 已显示的项目
    totalItems: 0,           // 总项目数
    currentProgress: 0       // 当前进度
  },

  lifetimes: {
    attached() {
      this.calculateTotalItems();
    }
  },

  observers: {
    'steps': function(newSteps) {
      if (newSteps && newSteps.length > 0) {
        this.calculateTotalItems();
        this.initializeDisplay();
      }
    }
  },

  methods: {
    // 计算总项目数
    calculateTotalItems() {
      const { steps } = this.data;
      let total = 0;
      steps.forEach(step => {
        total += 1; // 标题
        total += step.subs.length; // 子项
      });
      this.setData({ totalItems: total });
    },

    // 初始化显示
    initializeDisplay() {
      const firstStep = this.data.steps[0];
      if (firstStep) {
        this.setData({
          displayedItems: [{
            type: 'title',
            content: firstStep.title,
            stepIndex: 0,
            subIndex: -1
          }],
          currentProgress: 1
        });
      }
    },

    // 点击项目
    onItemClick(e) {
      const { stepIndex, subIndex } = e.currentTarget.dataset;
      
      // 只能点击最后一个显示的项目
      const { displayedItems } = this.data;
      const lastItem = displayedItems[displayedItems.length - 1];
      
      if (lastItem.stepIndex !== stepIndex || lastItem.subIndex !== subIndex) {
        return;
      }

      this.showNextItem(stepIndex, subIndex);
    },

    // 显示下一个项目
    showNextItem(stepIndex, subIndex) {
      const { steps, displayedItems } = this.data;
      const currentStep = steps[stepIndex];
      
      if (subIndex === -1) {
        // 当前是标题，显示第一个子项
        if (currentStep.subs.length > 0) {
          const newItem = {
            type: 'sub',
            content: currentStep.subs[0],
            stepIndex: stepIndex,
            subIndex: 0
          };
          this.addDisplayedItem(newItem);
        }
      } else {
        // 当前是子项
        if (subIndex < currentStep.subs.length - 1) {
          // 显示下一个子项
          const newItem = {
            type: 'sub',
            content: currentStep.subs[subIndex + 1],
            stepIndex: stepIndex,
            subIndex: subIndex + 1
          };
          this.addDisplayedItem(newItem);
        } else {
          // 当前子项是最后一个，显示下一个大项的标题
          if (stepIndex < steps.length - 1) {
            const nextStep = steps[stepIndex + 1];
            const newItem = {
              type: 'title',
              content: nextStep.title,
              stepIndex: stepIndex + 1,
              subIndex: -1
            };
            this.addDisplayedItem(newItem);
          } else {
            // 所有项目都已显示完毕
            this.triggerEvent('completed');
          }
        }
      }
    },

    // 添加显示项目
    addDisplayedItem(item) {
      const { displayedItems, totalItems } = this.data;
      const newDisplayedItems = [...displayedItems, item];
      const progress = Math.round((newDisplayedItems.length / totalItems) * 100);
      
      this.setData({
        displayedItems: newDisplayedItems,
        currentProgress: progress
      });
    }
  }
})