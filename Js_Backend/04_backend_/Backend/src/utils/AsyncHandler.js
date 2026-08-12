// higher order functions

// with try-catch
// const AsyncHandler = (func) => {
//     async (req, res, next) => {
//         try {
//             await func(req, res, next);
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     };
// };

// other syntax
const AsyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message,
        });
    }
};

// promise based

const promise_based_async_handler = (_function_) => {
    (req, res, next) => {
        Promise.resolve(_function_).catch((error) => {
            next(error);
        });
    };
};

// 
export default AsyncHandler