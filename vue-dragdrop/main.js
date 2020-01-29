new Vue({
	el: '#app',
	data: {
		items: [
			{ value: 1, cls: '' },
			{ value: 2, cls: '' },
			{ value: 3, cls: '' },
			{ value: 4, cls: '' },
			{ value: 5, cls: '' },
		],
		draggingContainerCls: '',
		draggingItem: {},
	},
	methods: {
		add () {
			//this.items.splice(0, 0, { value: this.items.length + 1, cls: '' })
			this.items.push({ value: this.items.length + 1, cls: '' })
		},

		remove (item) {
			this.items = this.items.filter(i => i !== item)
		},

		dragStart (ev, item) {
			this.draggingItem = item
			this.items.forEach(item => (item.cls = ''))
			this.draggingContainerCls = 'container--dragging'
			// eyecandy: this prevent browser from snapshot our dragging style
			setTimeout(() => {
				item.cls = 'item--dragging'
			}, 100)
		},

		onDragEnd (ev, item) {
			this.draggingItem.cls = ''
			this.draggingItem = {}
			this.draggingContainerCls = ''
		},

		onLastItemDragEnter () {
			var lastitem = this.items[this.items.length - 1]
			if (!lastitem) return
			this.onDragEnter(lastitem)
		},

		onDragEnter (item) {
			if (!this.draggingItem.value) return

			var fromindex = -1
			var toindex = -1
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i] === item) toindex = i
				if (this.items[i] === this.draggingItem) fromindex = i
			}

			if (fromindex === toindex) return
			if (fromindex < toindex) {
				for (let i = fromindex; i < toindex; i++) {
					this.items[i] = this.items[i + 1]
				}
				this.items[toindex] = this.draggingItem
			} else {
				for (let i = fromindex; i > toindex; i--) {
					this.items[i] = this.items[i - 1]
				}
				this.items[toindex] = this.draggingItem
			}
			this.$forceUpdate()
		},

		onDragOver (ev) {
			ev.preventDefault()
		},
	},
})
