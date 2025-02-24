import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Category from './Category';
import './CategoryScrollView.css';

const provisionalCategories = [
    { id: 1, title: 'Technology', image: 'tech.jpg' },
    { id: 2, title: 'Health', image: 'health.jpg' },
    { id: 3, title: 'Science', image: 'science.jpg' },
    { id: 4, title: 'Travel', image: 'travel.jpg' },
    { id: 5, title: 'Education', image: 'education.jpg' },
    { id: 6, title: 'Sports', image: 'sports.jpg' },
    { id: 7, title: 'Entertainment', image: 'entertainment.jpg' },
    { id: 8, title: 'Food', image: 'food.jpg' }
];

export default function CategoryScrollView() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(provisionalCategories);
    }, []);

    // useEffect(() => {
    //     axios.get('http://your-backend-url/api/categories')
    //         .then(response => {
    //             setCategories(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the categories!', error);
    //         });
    // }, []);

    return (
        <div className="category-scroll-view">
            {categories.map(category => (
                <Category key={category.id} title={category.title} image={category.image} />
            ))}
        </div>
    );
}