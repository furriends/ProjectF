module.exports = {
    renameApplicationFields: (application) => {
        out = {
            applicationId: application.application_id,
            animalId: application.animal_id
        }

        if (application.home_type) {
            out.typeOfHome = application.home_type
        }
        if(application.budget) {
            out.yearlyBudget = application.budget
        }
        if(application.pets) {
            out.otherPets = application.pets
        }
        if(application.status) {
            out.applicationStatus = application.status
        }

        return out
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