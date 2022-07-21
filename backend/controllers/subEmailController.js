import SubEmail from "../models/SubEmailModel.js"

//CreateSubEmail
export const createSubEmail = async (req, res, next) => {
    const newEmail = new SubEmail(req.body)

    try {
        const savedNewEmail = await newEmail.save()
        res.status(200).json(savedNewEmail)
    }
    catch (err) {
        next(err)
    }
}

//DeleteHotel
export const deleteSubEmail = async (req, res, next) => {
    try {
        await SubEmail.findByIdAndDelete(req.params.id);
        res.status(200).json("SubEmail has been deleted");
    } catch (err) {
        next(err);
    }
}

//GetSubEmail
export const getSubEmail = async (req, res, next) => {
    try {
        const subEmail = await SubEmail.findById(req.params.id);
        res.status(200).json(subEmail);
    } catch (err) {
        next(err);
    }
}

//GetAllSubEmail
export const getAllSubEmails = async (req, res, next) => {
    try {
        const subEmails = await SubEmail.find();
        res.status(200).json(subEmails);
    } catch (err) {
        next(err);
    }
}


