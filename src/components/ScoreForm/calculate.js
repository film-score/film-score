// /*
//  * This file calculates the final weighted scores
//  */

// // Calculate the subcategory score
// function calculateScore(array) {
//     let total = 0,
//         divisor = 0

//     total = array.reduce((a, x) => a += (x[0] * x[1]), 0)
//     divisor = array.reduce((a, x) => a + (x[0]), 0)

//     return total / divisor
// }


// function calculateCompositeScore(results) {
//     results = results.map(x => new Array(x[0], calculateScore(x[1])))

//     const compositeScore = Math.round(calculateScore(results) * 10) / 10

//     // showResults(compositeScore)

//     return Number(compositeScore)
// }


// /*
//  *  This code tallies the scores for each subcategory and packages them to be
//  *  calculated after the form has been submitted.
//  */

// // Gets the score of any "subcategory". Pass in the "name" attr of a group of
// // radio buttons, and it returns the value of the checked radio.
// function getSubcategoryScore(name) {
//     if (typeof name == "string") {
//         const form = document.getElementById("newScore__form"),
//             elements = form.elements[name]

//         for (let element of elements) {
//             if (element.checked) {
//                 return element.value
//             }
//         }

//         return 0
//     } else {
//         throw new Error('Function getSubcategoryScore() requires one argument of type string.')
//     }
// }

// // Returns an object of all scores in a category, based on the fieldset ID that
// // is passed to it. It will find all .field-groups within that fieldset and
// // send them to getSubcategoryScore() for the value. Returned values are added
// // to a "scores" array in the output object.
// function getCategoryScores(fieldset) {
//     fieldset = document.querySelector(`fieldset#${fieldset}`)

//     const allFields = [...fieldset.querySelectorAll('.form-group')]

//     let results = [
//         Number(fieldset.dataset.categoryScale),
//         []
//     ]

//     for (let field of allFields) {
//         let name = field.id,
//             scale = field.dataset.subcategoryScale

//         results[1].push([Number(scale), Number(getSubcategoryScore(name.toString()))])
//     }

//     return results
// }

// // "Constructor" of this module. Gets all fieldsets within the submitting form
// // and returns an object of objects, one per category.
// function validateForm(event) {
//     event.preventDefault()

//     const categories = [...event.target.querySelectorAll('fieldset')]

//     let results = new Array()

//     for (let category of categories) {
//         let categoryName = (category.id).toString()

//         results.push(getCategoryScores(categoryName))
//     }

//     return {
//         composite: calculateCompositeScore(results),
//         categories: results.map(x => calculateScore(x[1]))
//     }
// }

class ScoreCalculator {

    constructor() {
        this.getScores = this.getScores
    }

    getScores(form) {
        const   categoryScores = this.getAllCategoryScores(form),
                compositeScore = this.compositeScore(categoryScores)

        return {
            composite: compositeScore,
            categories: categoryScores
        }
    }

    getCategories(form) {
        return form.querySelectorAll('fieldset.form-page')
    }
    
    getSubcategories(category) {
        return category.querySelectorAll('.form-group')
    }

    getSubcategoryValues(category) {
        let subcategoryValues = []
        
        for (let subcategory of this.getSubcategories(category)) {
            subcategoryValues.push([
                Number(subcategory.dataset.subcategoryScale),
                this.getRangeValue(subcategory)
            ])
        }

        return subcategoryValues
    }

    getRangeValue(subcategory) {
        const elements = subcategory.getElementsByTagName('input')

        for (let element of elements) {
            if (element.type == 'radio') {
                if (element.checked) {
                    return Number(element.value)
                }
            }
        }

        return 0
    }

    getAllCategoryScores(form) {
        let categoryScores = []

        for (let category of this.getCategories(form)) {
            categoryScores.push(this.categoryScore(category))
        }

        return categoryScores
    }

    categoryScore(category) {
        const categoryValues = [...this.getSubcategoryValues(category)]

        return [
            Number(category.dataset.categoryScale),
            this.calculate(categoryValues)//.reduce((a, x) => a + x)/categoryValues.length
        ]
    }

    compositeScore(categoryScores) {
        return this.calculate([
            ...categoryScores
        ])
    }

    calculate(values) {
        let total, divisor = 0

        total = values.reduce((a, x) => a += (x[0] * x[1]), 0)
        divisor = values.reduce((a, x) => a + (x[0]), 0)

        return total / divisor
    }
}

module.exports = ScoreCalculator