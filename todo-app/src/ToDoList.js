import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Tab, Form, Button } from 'react-bootstrap';
import './Todo.css';
import { todos } from './todoItems';

function ToDoList() {
    const [items,setItems ] = useState(todos);

    const getVariant = (dueDate) => { 
        const currentDate = new Date();
        const itemDate = new Date(dueDate);
        const diffDays = (itemDate - currentDate) / (1000 * 60 * 60 * 24);

        if (diffDays < 2) return 'danger';
        if (diffDays < 4) return 'warning';
        if (diffDays < 7) return 'success';
        return 'primary';
    };

    const handleDescriptionChange = (index, event) => {
        const newItems = [...items];
        newItems[index].description = event.target.textContent;
        setItems(newItems);
    };

    const handleDateChange = (index, newDate) => {
        const newItems = [...items];
        newItems[index].dueDate = newDate;
        setItems(newItems);
    };


    return (
        <Container>
            <h1>Assignment 2: Harish's ToDo List</h1>
        
            <br/> 
            
            
            <Row>
                <Col md={4}>
                    <Form className='form1'>
                        <Form.Group className="mb-3" controlId='todolabel'>
                            <Form.Label>ToDo Item Title</Form.Label>
                            <Form.Control type="text" placeholder="Add todo item title" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="duedate">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type='date' />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add ToDo</Button>
                    </Form>
                </Col>
                <Col md={8}>
                    <Tab.Container id="left-tabs-example" defaultActiveKey={items[0]?.title}>
                        <Row>
                            <Col sm={4}>
                                <ListGroup role="tablist"> 
                                    {items.map((item, index) => (
                                        <ListGroup.Item 
                                            key={index}
                                            eventKey={item.title}
                                            as="a"  
                                            className={`LG list-group-item-${getVariant(item.dueDate)}`} 
                                        >
                                            {item.title}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Col>

                            <Col sm={8}>
                                <Tab.Content>
                                    {items.map((item, index) => (
                                        <Tab.Pane 
                                            eventKey={item.title} 
                                            key={index}
                                            role="tabpanel"  
                                        >
                                            <div
                                                contentEditable
                                                suppressContentEditableWarning
                                                onBlur={(e) => handleDescriptionChange(index, e)}
                                            >
                                                {item.description}
                                                
                                            </div>
                                            <Form.Group>
                                                <input  
                                                    type="date"
                                                    value={item.dueDate}
                                                    className="duedate_e"
                                                    onChange={(e) => handleDateChange(index, e.target.value)}
                                                />
                                            </Form.Group>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    );
}

export default ToDoList;