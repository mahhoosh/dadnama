# RhPagination Component Help
Example usage:
    
  	import{RhPagination} from 'Components';
	  import React from 'react';
	  import { render } from 'react-dom';
	  class App extends React.Component {
	  constructor(props) {
	  super(props);
	  this.handlePageChanged = this.handlePageChanged.bind(this);
	  this.state = {
			  items: [
		        {id: 0, value: 'ruby'},
		        {id: 1, value: 'javascript'},
		        {id: 2, value: 'lua'},
		        {id: 3, value: 'go'},
		        {id: 4, value: 'julia'}
       		]
			};
		}
	  onSearchPreview(term) {
	    let items = [
	      {id: 0, value: '0'},
	      {id: 1, value: '1'},
	      {id: 2, value: '2'},
	      {id: 3, value: '3'},
	      {id: 4, value: '4'}
	    ];
	    items = items.slice(0, term.length);
	    this.setState({
	      items: items
	    });
	  }

	   onSearch(e) {
		console.log('------------onSearch-------',e)
	    }
		onSuggestionClick(e) {
		console.log('------------onSuggestionClick-------',e)
	    }
	

		render() {
			return (
			   <RhSearch
		          suggestionList={this.state.items}
		          async
		          onKeyPress={this.onSearchPreview}
		          delayMillis={1000}
		          minCharsToSearch={3}
		          suggestionCount={4}
		          onSearch={this.onSearch.bind(this)}
		          onSuggestionClick={this.onSuggestionClick.bind(this)}
       		/>

			);
		}
	}


# Props
|  Name             |  Type    |  Default |  Description |
|:------            |:------   |:---------|:-------------|
| suggestionList          | array    |    -    |Required. |
| onKeyPress              | func  |-|-|
| onSearch              | func  |-|- |
| onSuggestionClick              | function  |-|-|
| async              | bool  |-|-|
| delayMillis              | number  |-|-|
| suggestionCount              | number  |-|-|
| minCharsToSearch              | number  |-|-|