//Variables used to communicate with server
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';  //basic server address which give the endpoints to communicate
var myHeaders = {
	'X-Client-Id': '1643',
	'X-Auth-Token': '93fe74de5d023ad3f83c282c5673fc5e'
};

//All query need to have myHeaders but jQuery can set up to .ajax by using this method
$.ajaxSetup({
	headers: myHeaders
});

//Documentation
// GET /board
// -----------------------------
// Response:
// {
//    id: int,
//    name: string,
//    columns: [{
//        id: int,
//        name: string,
//        cards: [{
//            id: int,
//            bootcamp_kanban_column_id: int,
//            name: string
//        }]
//    }]
// }

$.ajax({
	url: baseUrl + '/board',
	method: 'Get',
	success: function(response) {
		setupColumns(response.columns);  //after receive answer we can createColumns
	}
});

//function will create the same amount of column like answer from server and pin to table
function setupColumns(column) {
	column.forEach(function (column) {
		var col = new Column(column.id, column.name); //we need id becouse of server create new id simultaneously to new element
		board.addColumn(col);
		setupCards(col, column.cards); //the same info like column from API endpoint
	});
}
//iterate of all cards, create and add to columns
function setupCards(col, cards) {
	cards.forEach(function (card) {
	var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id); // we need to match witch server response
	col.addCard(card);  //function from Card.js
	});
}


