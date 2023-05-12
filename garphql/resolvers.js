const Recipe = require('../models/recipe')

module.exports ={
    Query:{
        async recipe(_, {id})
        {
            return await Recipe.findById(id)
        },
        async getRecipes(_,{amount}){
            return await Recipe.find().sort({createdAt: -1}).limit(amount)
        }
    },
    Mutation:{
        async createRecipe(_,{recipeInput: {name, description}}){
            const create= new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toISOString(),
                thumbsUp:5,
                thumbsDown:0
            })
            const res= await this.createRecipe.save()
            return{
                id: res.id,
                ...res._doc
            }
        },
        async deleteRecipe(_,{id}){
           const del= (await Recipe.deleteOne({_id: id})).deletedCount
           return del
        },
        async editRecipe(_,{id ,recipeInput: {name,description}}){
            const edit= (await Recipe.updateOne({_id: id},{name:name, description: description})).modifiedCount
            return edit
         }
    }
}