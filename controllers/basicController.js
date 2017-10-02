const basicController = {};

basicController.get = (req, res) => {
    res.json({
        message: 'working'
    });
};

export default basicController;
