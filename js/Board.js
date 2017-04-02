// Board object
var board = {
	name: 'Kanban Board',
	// Method that will create new column
	addColumn: function(column) {
		this.$element.append(column.$element);  //this.$element is board.$element
		// jQueryUI
		initSortable();
	},
	$element: $('#board .column-container')
};

$('.create-column').click(function() {
	var columnName = prompt('Type column name');
	$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: {
		name: columnName
		},
		success: function(response) { //when column is created on server we cen create on view
			var column = new Column(response.id, columnName); // first created column with data response from server
    		board.addColumn(column); //after that column will be created on board
		}
	});
});


function initSortable() {
	// Choose all card list which can movin the card to antoher place.
	// jQuery UI .sortable(); can give us drag 'n' drop function
    $('.column-card-list').sortable({
    	// Configuration object from documentation.
	    connectWith: '.column-card-list', // Select the list in which the sort will work
	    placeholder: 'card-placeholder' // Holds the class name that apears when it hovers over an empty field to which we drop a item.
    }).disableSelection(); // Turn off select text when drag'n'drop
}