// Genre Start 
const genre = ['Alternative Rock', 'Blue Grass', 'Blues', 'Country', 'Folk', 'Heavy Metal', 'Indie', 'Pop', 'Punk Rock', "R&B", 'Rap', 'Rock & Roll', 'Other'];
const multiSelectGenre = {
  el: '#appGenre',
  data () {
    return {
      searchTerm: '',
      searchTermWidth: '',
      lastTerm: '',
      suggestList: genre,
      selectedList: [],
      activeVertical: 0,
      activeHorizontal: -1,
      showSuggestPanel: false,
      hasFocus: false
    }
  },
  computed: {
    sanitizedTerm () {
      return this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    },
    filteredSuggest () {
      if (!this.searchTerm) return this.suggestList
      
      const ex = RegExp(this.sanitizedTerm, 'i')
      const filtered = this.suggestList.filter(ele => ex.test(ele))
      const label = `<strong><sup>+</sup> ${this.searchTerm}</strong>`
      return filtered.length ? filtered : [{ label, value: this.searchTerm }]
    }
  },
  watch: {
    value (newList) {
      this.selectedList = newList
    },
    list (newList) {
      this.suggestList = newList
    },
    filteredSuggest (newList) {
      this.activeVertical = 0
    },
    searchTerm (newTerm) {
      this.$nextTick().then(() => this.calcTextWidth())
    },
    selectedList (newList) {
      this.$emit('input', newList)
    }
  },
  methods: {
    addSelected (val) {
      if (this.selectedList.includes(val)) return
      this.selectedList.push(val)
      this.searchTerm = ''
      this.activeHorizontal = -1
    },
    addActive () {
      const value = this.filteredSuggest[this.activeVertical]
      if (value && this.showSuggestPanel) this.addSelected(value.value || value)
    },
    removeSelected (index) {
      this.selectedList.splice(index, 1)
    },
    traverseList (direction) {
      if (direction === 'next' && !this.showSuggestPanel) {
        this.activeVertical = -1
      }
      
      const lastIndex = this.filteredSuggest.length - 1
      let newIndex = direction === 'next' ? 
          this.activeVertical + 1 :
          this.activeVertical - 1
      
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeVertical = newIndex
      }
      
      this.scrollToView()
    },
    traverseSelected (direction) {
      const lastIndex = this.selectedList.length - 1
      if (this.activeHorizontal == -1) {
        this.activeHorizontal = lastIndex + 1
      } 
      let newIndex = direction === 'left' ? 
            this.activeHorizontal - 1 :
            this.activeHorizontal + 1 
      if (newIndex == this.selectedList.length) {
        this.activeHorizontal = -1
        return
      }
      
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeHorizontal = newIndex
      }
    },
    traverseSelectedDelete () {
      if (this.activeHorizontal === -1) return
      this.removeSelected(this.activeHorizontal)
    },
    backspaceDelete () {
      if (this.activeHorizontal !== -1) return
      if (!this.selectedList.length) return
      if (this.lastTerm) return
      const lastIndex = this.selectedList.length - 1
      if (lastIndex !== -1) this.removeSelected (lastIndex)
    },
    scrollToView () {
      if (!this.showSuggestPanel) return
      this.$nextTick().then(() => {
        const container = this.$refs.panel
        const item = this.$el.querySelector('.suggest-item.active')
        
        const sy1 = container.scrollTop
        const sy2 = container.offsetHeight + sy1
        
        const ty1 = item.offsetTop
        const th = item.offsetHeight
        const ty2 = th + ty1
        
        if (ty1 <= sy2 && sy2 < ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty1 - sy2)) + th
        } else if (ty1 < sy1 && sy1 <= ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty2 - sy1)) - th
        }
      })
    },
    calcTextWidth () {
      const textWidth = this.$refs.tester.clientWidth
      const finalWidth = textWidth ? textWidth + 10 : 50
      this.searchTermWidth = `${finalWidth}px`
    },
    hightlightWord (val) {
      if (val.label) return val.label
      if (!this.searchTerm) return val
      const termRegex = RegExp(`(${this.sanitizedTerm})`, 'i')
      return val.replace(termRegex, (m, t) => `<span class="highlight">${t}</span>`)
    }
  }
}
const vmGenre = new Vue(multiSelectGenre)

//Genre End

// Instrument Start 

const propData = ['Bass Guitar','Brass', 'Disc Jockey', 'Drums', 'Guitar', 'Keyboard/Piano', 'Orchestra Strings', 'Vocals', 'Woodwind', 'Other']
const multiSelect = {
  el: '#app',
  data () {
    return {
      searchTerm: '',
      searchTermWidth: '',
      lastTerm: '',
      suggestList: propData,
      selectedList: [],
      activeVertical: 0,
      activeHorizontal: -1,
      showSuggestPanel: false,
      hasFocus: false
    }
  },
  computed: {
    sanitizedTerm () {
      return this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    },
    filteredSuggest () {
      if (!this.searchTerm) return this.suggestList
      
      const ex = RegExp(this.sanitizedTerm, 'i')
      const filtered = this.suggestList.filter(ele => ex.test(ele))
      const label = `<strong><sup>+</sup> ${this.searchTerm}</strong>`
      return filtered.length ? filtered : [{ label, value: this.searchTerm }]
    }
  },
  watch: {
    value (newList) {
      this.selectedList = newList
    },
    list (newList) {
      this.suggestList = newList
    },
    filteredSuggest (newList) {
      this.activeVertical = 0
    },
    searchTerm (newTerm) {
      this.$nextTick().then(() => this.calcTextWidth())
    },
    selectedList (newList) {
      this.$emit('input', newList)
    }
  },
  methods: {
    addSelected (val) {
      if (this.selectedList.includes(val)) return
      this.selectedList.push(val)
      this.searchTerm = ''
      this.activeHorizontal = -1
    },
    addActive () {
      const value = this.filteredSuggest[this.activeVertical]
      if (value && this.showSuggestPanel) this.addSelected(value.value || value)
    },
    removeSelected (index) {
      this.selectedList.splice(index, 1)
    },
    traverseList (direction) {
      if (direction === 'next' && !this.showSuggestPanel) {
        this.activeVertical = -1
      }
      
      const lastIndex = this.filteredSuggest.length - 1
      let newIndex = direction === 'next' ? 
          this.activeVertical + 1 :
          this.activeVertical - 1
      
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeVertical = newIndex
      }
      
      this.scrollToView()
    },
    traverseSelected (direction) {
      const lastIndex = this.selectedList.length - 1
      if (this.activeHorizontal == -1) {
        this.activeHorizontal = lastIndex + 1
      } 
      let newIndex = direction === 'left' ? 
            this.activeHorizontal - 1 :
            this.activeHorizontal + 1 
      if (newIndex == this.selectedList.length) {
        this.activeHorizontal = -1
        return
      }
      
      if (newIndex <= lastIndex && newIndex >= 0) {
        this.activeHorizontal = newIndex
      }
    },
    traverseSelectedDelete () {
      if (this.activeHorizontal === -1) return
      this.removeSelected(this.activeHorizontal)
    },
    backspaceDelete () {
      if (this.activeHorizontal !== -1) return
      if (!this.selectedList.length) return
      if (this.lastTerm) return
      const lastIndex = this.selectedList.length - 1
      if (lastIndex !== -1) this.removeSelected (lastIndex)
    },
    scrollToView () {
      if (!this.showSuggestPanel) return
      this.$nextTick().then(() => {
        const container = this.$refs.panel
        const item = this.$el.querySelector('.suggest-item.active')
        
        const sy1 = container.scrollTop
        const sy2 = container.offsetHeight + sy1
        
        const ty1 = item.offsetTop
        const th = item.offsetHeight
        const ty2 = th + ty1
        
        if (ty1 <= sy2 && sy2 < ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty1 - sy2)) + th
        } else if (ty1 < sy1 && sy1 <= ty2) {
          this.$refs.panel.scrollTop = (sy1 + (ty2 - sy1)) - th
        }
      })
    },
    calcTextWidth () {
      const textWidth = this.$refs.tester.clientWidth
      const finalWidth = textWidth ? textWidth + 10 : 50
      this.searchTermWidth = `${finalWidth}px`
    },
    hightlightWord (val) {
      if (val.label) return val.label
      if (!this.searchTerm) return val
      const termRegex = RegExp(`(${this.sanitizedTerm})`, 'i')
      return val.replace(termRegex, (m, t) => `<span class="highlight">${t}</span>`)
    }
  }
}
const vm = new Vue(multiSelect)

//Instrument End

!function($){
    var DOW_id = 0
    const nextId=() => "DOW_" + DOW_id++
    $.fn.dayOfWeek = function(type="radio") { // or "checkbox"
        return this.map(function() {
            const id = nextId(),
                replacment = $(`<div class="day-of-week">${
                    days('narrow').map(
                        (day, i) => `<input  id="${id+"-"+i}" type=${type} name=${this.name} value=${i}><label for="${id+"-"+i}">${day}</label>`
                    ).join("")
                }</div>`)
            $(this).replaceWith(replacment)
            return replacment[0]
        })
    }
    function days(width = 'narrow') {
        var today = new Date(),
            days = []
        for(var i = 0; i < 7; i++) {
            days[today.getDay()] = today.toLocaleString(window.navigator.language, {
                weekday: width
            })
            today.setDate(today.getDate()+1)
        }
        return days
    }
}(jQuery)

!function($){
    var NOW_id = 0
    const nextId=() => "NOW_" + NOW_id++
    $.fn.nightOfWeek = function(type="radio") { // or "checkbox"
        return this.map(function() {
            const id = nextId(),
                replacment = $(`<div class="night-of-week">${
                    days('narrow').map(
                        (day, i) => `<input  id="${id+"-"+i}" type=${type} name=${this.name} value=${i}><label for="${id+"-"+i}">${day}</label>`
                    ).join("")
                }</div>`)
            $(this).replaceWith(replacment)
            return replacment[0]
        })
    }
    function days(width = 'narrow') {
        var today = new Date(),
            days = []
        for(var i = 0; i < 7; i++) {
            days[today.getDay()] = today.toLocaleString(window.navigator.language, {
                weekday: width
            })
            today.setDate(today.getDate()+1)
        }
        return days
    }
}(jQuery)
