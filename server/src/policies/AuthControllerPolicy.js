const Joi = require('joi')

module.exports = {
    // Check for registration credentials 
    register (req, res, nxt) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{6,32}$')
            )
        }

        const {error, value} = Joi.validate(req.body, schema)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Email isn\'t valid! Please try to use a valid email.'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 
                        `
                        Password provided failed to match the following rules:
                        <br>
                        1. It must contain only the following cherecters: upper, lower, numeric.
                        <br>
                        2. It must be at least 6 cherecters or greater in length.
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information.'
                    })
                    break
            }
        } else {
            nxt()
        }
    }
}