import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import BookCreationWarning from './books/BookCreationWarning';
import UpdateBookTextarea from './books/updateForm/UpdateBookTextarea';
import UpdateBookSelect from './books/updateForm/UpdateBookSelect';
import UpdateBookInput from './books/updateForm/UpdateBookInput';

class StripedTableUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item : this.props.item,
            selectedFile : this.props.selectedFile === undefined ? '' : this.props.selectedFile, // File selected for the image
            temp_item: this.props.item,
            changeHappened : false,
            inputFields : this.props.inputFields === undefined ? [] : this.props.inputFields,
            textareaFields : this.props.textareaFields,
            selectFields : this.props.selectFields
        }

    }

    componentDidMount() {
        // We don't need to getItem() if we are creating a new item.
        if ( this.props.type == 'update' ) {
            this.getItem();
        }
    }

    componentWillReceiveProps( propsReceive ){

        const id = propsReceive.item_id;

        axios.get(propsReceive.routes.getItem+id).
        then( res => { 
            this.setState({item:res.data,temp_item:res.data});
            this.setState({selectedFile:res.data.book_image});
        });

        this.setState({selectFields: propsReceive.selectFields});

        // Reseting the display when 
        this.resetDisplayAll();

    }
    
    resetDisplayAll() {

        let editItems = document.getElementsByClassName('edit-item');
        let itemFieldPreview = document.getElementsByClassName('item-field-preview');

        for (let i=0;i<editItems.length;i++) {
            editItems[i].display = 'none';
        }

        for (let i=0;i<itemFieldPreview.length;i++) {
            itemFieldPreview[i].display = 'block';
        }

    }

    getItem() {
        let singleBookUrl = `${this.props.getItem}${this.props.item.id}`;

        axios.get( singleBookUrl).
        then( res => { 
            this.setState({item:res.data,temp_item:res.data}); 
            this.setState({selectedFile:res.data.book_image});
        });

    }

    // Update book functionalities.
    changeImage() {

       let imageVal = document.getElementById('imageUpload').files[0];
       let image = document.getElementsByClassName('bookCoverImage')[0];

       let reader = new FileReader();
        reader.onloadend = function () {
            image.src = reader.result;
        }
        if (imageVal) {
            reader.readAsDataURL(imageVal);
        } else {
            preview.src = "";
        }

        this.setState({changeHappened:true});

    }

    changeBookMember(event) {
        event.persist();
        let member = event.target.getAttribute('data-member');

        this.setState( prevState => {
            let temp_item = Object.assign({},prevState.temp_item);
            temp_item[member] = event.target.value;  
            return { temp_item }
        });

        this.setState({changeHappened:true});
    }



    swapVisibility(id2,id1) {
        if( document.getElementById(id1).style.display === 'none' ) {
            document.getElementById(id1).style.display = 'block';
            document.getElementById(id2).style.display = 'none';
        }
        else {
            document.getElementById(id1).style.display = 'none';
            document.getElementById(id2).style.display = 'block';
        }

    }

    updateBook() {
        const data = new FormData();
        if( this.testBookData() ) {
            // If it has an image
            if( document.getElementById('imageUpload').files[0] ) {
                data.append('imageUpload' , document.getElementById('imageUpload').files[0] );
            }

            // If it has any text area fields
            if( this.state.textareaFields != null && this.state.textareaFields != undefined ) {
                for (let i=0;i<this.state.textareaFields.length;i++) {
                    let fieldValue = this.state.textareaFields[i];
                    data.append(fieldValue,this.state.temp_item[fieldValue]);
                }
            }

            // If it ahs any input fields
            if( this.state.inputFields != null && this.state.inputFields != undefined) {
                for (let i=0;i<this.state.inputFields.length;i++) {
                    let fieldValue = this.state.inputFields[i].name;
                    data.append(fieldValue,this.state.temp_item[fieldValue]);
                }
            }

            //
            if( this.state.selectFields != undefined ) {
                if( this.state.selectFields.foreignKey != null && this.state.selectFields.foreignKey != undefined ) {
                    for (let i=0;i<this.state.selectFields.foreignKey.length;i++) {
                        let fieldValue = this.state.selectFields.foreignKey[i].name+'_id';
                        data.append(fieldValue,this.state.temp_item[fieldValue]);
                    }
                }
            }


            // If we are currently updating the book.
            if( this.props.type != 'update' ) {
                data.append(this.props.itemName+'_id',this.state.item.id);
            }

            let url = '';
            console.log(this.props.type);
            if( this.props.type == 'update' ) {
                url = this.props.routes.updateBook+this.state.item.id;
            }
            else {
                url = this.props.routes.createBook;
            }
            // Send data to backend
            axios.post(url, data).then((res)=>{
                document.getElementById('alert-success').style.display = 'block';
                document.getElementById('alert-success').style.opacity = 1;
            });
        }
    }

    
    testBookData() {
        let notNullWarnings = this.generateNotNullWarnings();
        let isDataNull = this.checkIfDataIsNull(notNullWarnings);
        //let isAuthorIdValid = false;
        //let isCategoryValid = false;
        let areNumbersValid = false;
        //let isIsbnLegit = false;

        if( isDataNull ) {
            //isAuthorIdValid = this.checkAuthorId('author');
            //isCategoryValid = this.checkCategoryId('category');
            if( this.state.inputFields != undefined && this.state.inputFields != '' ) {
                areNumbersValid = this.checkNumbers();
            }
            else {
                areNumbersValid = true;
            }
            //isIsbnLegit = this.checkIsbn();
        }

        return ( areNumbersValid );
    }

    checkIsbn() {
        let isbn = this.state.temp_book.ISBN;
        let matches = isbn.match('^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{1}$');
        if ( matches === null ) {
            document.getElementById('invalid_isbn_isbn').style.display = 'block';
        }
        return matches != null;
    }

    checkNumbers() {
        let invalidNumbers = this.state.inputFields;

        // Checking for min and max values.
        let areInvalidNumbers = invalidNumbers.filter((item)=>{
            if( item.max != undefined && item.min != undefined ) {
                 return parseFloat(this.state.temp_item[item.name]) > item.max || parseFloat(this.state.temp_item[item.name]) < item.min ;
            }
        })

        // Generating the alerts based on the item name
        if( areInvalidNumbers.length > 0 ) {
            areInvalidNumbers.map(item => {
                document.getElementById('invalid_number_'+item.name).style.display = 'block';
            });
        }

        return areInvalidNumbers.length === 0;
    }


    checkIfDataIsNull(notNullWarnings) {
        let notNullEl = document.getElementsByClassName('not-null-warning');
        for (let i=0;i<notNullEl.length;i++ ) {
            notNullEl[i].style.display = 'none';
        }
        
        let isNull = notNullWarnings.filter((item) => {
            if(this.state.temp_item[item] || this.state.temp_item[item] === 0 && (this.state.temp_item[item] !== '')){
                return false;
            }
            else {
                return true;
            }
        });
        isNull.map((item)=>{
            document.getElementById('not_null_'+item).style.display = 'block';
        });
        return isNull.length === 0;
    }

    generateAuthorOptions() {
        let that = this;
        return this.state.authors.map( (author,i) => {
            return <option selected={that.state.temp_book.author_id === author.id} value={author.id} name="author" key={i}>{author.name}</option>;
        } );
    }

    generateCategoriesOptions() {
        let that = this;
        return this.state.categories.map( (category,i) => {
            return <option selected={that.state.temp_book.category_id === category.id} value={category.id} name="author" key={i}>{category.name}</option>;
        } );
    }

    

    generateInputs() {
        let that = this;
        if( this.state.inputFields != '' && this.state.inputFields!= {} ) {
            return this.state.inputFields.map( (field,i) => {
                return <UpdateBookInput 
                            key={i}
                            member={that.state.temp_item[field.name]}
                            memberName={field.name}
                            changeBookMember={that.changeBookMember.bind(that)}
                            inputType={field.type}
                            min={field.type.min}
                            max={field.type.max}
                        />
            });
        }
        else {
            return '';
        }
    }

    generateTextareas() {
        let that = this;
        if( this.state.textareaFields != '' && this.state.textareaFields != undefined) {
            return this.state.textareaFields.map( (field,i) => {
                return <UpdateBookTextarea key={i} member={that.state.temp_item[field]} memberName={field} changeBookMember={that.changeBookMember.bind(that)} />
            });
        }
        else {
            return '';
        }
    }

    generateForeignKeysSelects() {
        let that = this;
        if( this.state.selectFields.foreignKey != '' && this.state.selectFields.foreignKey != undefined) {
            return that.state.selectFields.foreignKey.map( (field) => {

                let field_name = field.name; // Such as author.
                let field_name_id = field.name+'_id';
                let selectedId = -1;
                let member = '';

                // Generate the options and
                // seach for selected Id.
                let options = field.value.map( (item) =>  {

                    // If category.id == this.state.temp_item.category_id
                    if( item.id == that.state.temp_item[field_name_id] ) {
                        selectedId = item.id;
                        member = item[field_name];
                    }

                    return <option value={item.id}>{item[field_name]}</option>

                });
                

                return <UpdateBookSelect 
                    key={field_name}
                    member={member}
                    memberName={field_name_id}
                    currentId={selectedId}
                    options={options}
                    changeBookMember={that.changeBookMember.bind(that)}
                />

            });
        }
        else {
            return '';
        }
    }

    generateNotNullWarnings() {
        let notNullWarnings = [];

        for( let i = 0;i < this.state.textareaFields.length;i++ ) {
            notNullWarnings.push( this.state.textareaFields[i] );
        }
        for( let i = 0;i < this.state.inputFields.length;i++ ) {
            notNullWarnings.push( this.state.inputFields[i].name );
        }

        return notNullWarnings;
    }

    render() {

        
        
        // Warnings
        let notNullWarnings = this.generateNotNullWarnings();

        let notNullWarningsElement = notNullWarnings.map((item,i) => {
            return <BookCreationWarning type="not_null" text={item} key={i} />
        });


        let invalidNumbersWarning = '';
        if( this.state.inputFields != '' && this.state.inputFields != undefined ) {
            let invalidNumbers = this.state.inputFields;
            invalidNumbersWarning = invalidNumbers.map((item) => {
                return <BookCreationWarning type="invalid_number" text={item} />
            });
        }

        //let invalidIsbnWarning = <BookCreationWarning type="invalid_isbn" text="isbn"/>
        
        
        let generateInputs = this.generateInputs();
        let generateTextareas = this.generateTextareas();

        let generateSelects = '';
        if( this.state.selectFields != undefined ) {
            generateSelects = this.generateForeignKeysSelects();
        }

        let pencil = '';
        let bookCover = {};
        let imgSrc = '';
        let h3 = <h3 className="pt-3 pl-3">{this.props.type} {this.props.itemName}</h3>;

        if( this.state.selectedFile != '' && this.state.selectedFile != undefined ) {
            pencil = <FontAwesomeIcon className="pencil-icon" icon={faPencilAlt} fill="red" />

            bookCover = {
                height : '400px',
                objectFit : 'cover'
            }
    
            imgSrc = 'http://127.0.0.1:8000/storage/'+this.state.selectedFile;

            h3 = '';
        }

        return (
            <Card className="updateBookCard mb-5" id="updateBook" style={{width:'35%','marginBottom':'80px'}}>
                {h3}
                <img src={imgSrc} className="bookCoverImage" style={bookCover} />
                <span onClick={() => { document.getElementById('imageUpload').click() }}>{pencil}</span>
                    <input onChange={this.changeImage.bind(this)} id="imageUpload" type="file" style={{display:'none'}} name="imageUpload"></input>
                <Card.Body>
                    <Card.Title style={{position:'relative'}}>

                    {generateTextareas}
                    {generateInputs}
                    {generateSelects}

                    </Card.Title>
                </Card.Body>
                <Container className="text-center">
                    {notNullWarningsElement}
                    {invalidNumbersWarning}
                </Container>
                <Container className="text-center">
                    <Alert style={{display:'none',opacity:'0','width':'80%','marginLeft':'10%'}}  id="alert-success" variant="success">The {this.props.itemName} has been saved</Alert>
                </Container>
                <Container className={this.state.changeHappened ? 'visible text-center' : 'invisible text-center'}>
                    <Button
                        onClick={this.updateBook.bind(this)}
                        id="saveChanges" 
                        style={{width:'40%'}} 
                        className={this.state.changeHappened ? 'visible mb-3' : 'invisible mb-3'} 
                        variant="primary">saves changes
                    </Button>
                </Container>
            </Card>
        )
    }
}

export default StripedTableUpdate;