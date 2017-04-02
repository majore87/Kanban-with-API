// Contructor for new Card instance
function Card(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'No name';
	this.$element = createCard();

	function createCard() {
		// 1. Create new elements for Card components
		// Three bricks consists of a card

		// List element - card
		var $card = $('<li>').addClass('card');
		// Card description in paragraph
		var $cardDescription = $('<p>').addClass('<card-description>').text(self.name);
		// Button for delete card
		var $cardDelete = $('<button>').addClass('btn-delete').text('x');

		//2. Hooking up Events
		// Delete card
		$cardDelete.click(function() {
			self.removeCard();
		});
		//3. Construction of the card and return the instance
		$card.append($cardDelete)
			.append($cardDescription);
		return $card;
	}
}

// Card prototype with delete function
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.$element.remove();
			}
		});
	}
};