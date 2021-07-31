'use strict'

const { response } = require("express");
const { Category } = require('../models');
const { findByIdAndUpdate } = require("../models/categories");



//Obtener categorias -Paginado-Total-Populate-
const getCategories = async (req, res = response) => {
    try {


        let { limit, from } = req.query;
        const query = { state: true }
        if (Number.isNaN(Number(limit))) {
            limit = 2;

        } else if (Number.isNaN(Number(from))) {
            from = 0
        }

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate('user')
        ]);

        res.json({
            total,
            categories
        })

    } catch {
        res.json({
            msg: 'Categories Not found'
        })

    }



}

//Obtener categoria - populate-objeto-id
const getCategory = async (req, res = response) => {

    try {

        const { id } = req.params;

        const category = await Category.findById(id).populate('user');

        res.status(200).json({
            category
        })

    } catch (error) {
        res.status(500).json({
            msg: 'The server is wrong'
        })
    }

}
//Actualizar categoría
const updateCategory = async (req, res = response) => {

    try {
        const name = req.body.name.toUpperCase();
        const { id } = req.params;
        const data = {
            name,
            user: req.user._id
        }

        await Category.findByIdAndUpdate(id, data)
        const category = await Category.findOne({ name })
        res.json({
            category
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Sth gone wrong'
        })
    }


}

//Borrar categoría state:false
const deleteCategory = async (req, res = response) => {
    const { id } = req.params; 
    try {
        await Category.findByIdAndUpdate(id, {state:false})
        const category = Category.findById(id)
        res.status(200).json({
            msg: "Category Deleted"
        })
    } catch (error) {
        res.status(500).json({msg: 'No',error})
    }
}




const createCategory = async (req, res = response) => {


    const name = req.body.name.toUpperCase();

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    await category.save()

    res.status(201).json({
        category
    })

}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}