// Contructor for new column instance
function Column(id, name) {
	var self = this;   // for function inside function
	this.id = id; //id will be generate from server
	this.name = name || 'No name'; //defoult name for column
	this.$element = createColumn(); // With new instance there will be created new jquery object

	function createColumn() {

		// Creating Column components
		var $column = $('<div>').addClass('column'); // Add new class to div
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name); // Add name parameter by text method into h2 column title
		var $columnCardList = $('<ul>').addClass('column-list'); // To create lists of elements
		var $columnDelete = $('<button>').addClass('btn-delete').text('X');
		var $columnAddCard = $('<button>').addClass('add-card').text('Add card');

		// Delete column after pressing the button
		$columnDelete.click(function() {
			self.removeColumn();
		});
		// Add card after pressing the button
		$columnAddCard.click(function(event){
			var cardName = prompt("Type card name");// card name need to be in separate variable because of query to server
			event.preventDefault();

			$.ajax({
			url: baseUrl + '/card/',
			method: 'POST',
			data: {
			name: cardName,
			bootcamp_kanban_column_id: self.id
			},
			success: function(response) {
				var card = new Card(response.id, cardName);
				self.addCard(card); //lose contecxt with ajax so we need to
			}
			});
		});

		// Constructing column element to connect all parts.
		$column.append($columnTitle)
			.append($columnDelete)
			.append($columnAddCard)
			.append($columnCardList);

		// Returning created column
		return $column;  // without this we don't have a reference to new instance, where we cal function
	}
}

// Add two methods to Column prototype
Column.prototype = {
	// Methods takes card as the parameter which we want to add into column
	addCard: function(card) {
		//We take all 'ul' children from column and add new card.
		this.$element.children('ul').append(card.$element); //card.$element because we construct the same way like column.
	},
	// This method will delete whole column
	removeColumn: function() {
		var self = this; //because of jQuery AJAX
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function(response){
				self.$element.remove(); //after receive answer from server we can delete element from our view
			}
		});
	}
};
