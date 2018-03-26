module.exports = {
    renameApplicationFields: (application) => {
        return {
            applicationId: application.application_id,
            typeOfHome: application.home_type,
            yearlyBudget: application.budget,
            otherPets: application.pets,
            applicationStatus: application.status,
            animalId: application.animal_id
        }
    },

    renameAnimalFields: (animal) => {
        return {
            imgUrl: animal.img_url,
            birthdate: animal.birthdate,
            animalId: animal.animal_id,
            weight: animal.weight,
            animalName: animal.name,
            specialNeeds: animal.special_needs,
            intakeDate: animal.intake_date,
            sex: animal.sex,
            price: animal.fee
        }
    }
}