// Budget Controller
var budgetController = (function() {
    // function to extract expense value
    var Expense = function(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
        // function to extract income value
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    }

    // Array to store income and expense value
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        // Sum of all income and expense values    
        total: {
            expense: 0,
            income: 0
        }
    };

    // adds item to an array of income and expense 
    return {
        addItem: function(type, des, val) {
            var newItem, id;
            // create an id based on the array length
            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                id = 0;
            }
            if (type === 'exp') {
                newItem = new Expense(id, des, val);
            } else if (type === 'inc') {
                newItem = new Income(id, des, val);
            }
            //push value into an array
            data.allItems[type].push(newItem);
            // returns new added item
            return newItem;
        },
        testing: function() {
            console.log(data)
        }
    };

})();



// UI Controller
var UIController = (function() {

    var DOMStringList = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        addButton: '.add__btn',
        incomeUI: '.income__list',
        expenseUI: '.expenses__list'

    }
    return {
        getDomValue: function() {
            return {
                type: document.querySelector(DOMStringList.addType).value, // value will be 'inc' or 'exp'
                description: document.querySelector(DOMStringList.addDescription).value,
                value: document.querySelector(DOMStringList.addValue).value,
            }
        },

        addListItem: function(obj, type) {
            var newHtml, html, element;
            if (type === 'exp') {
                element = DOMStringList.expenseUI;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'inc') {
                element = DOMStringList.incomeUI;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml)

        },

        GetDomStringList: function() {
            return DOMStringList;
        }
    }
})();



// App controller
var appController = (function(budgetCtrl, UICtrl) {

    var SetupEventListeners = function() {
        var DOM = UICtrl.GetDomStringList();
        document.querySelector(DOM.addButton).addEventListener('click', AddItemController);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13) {
                AddItemController();
            }
        })
    }

    var AddItemController = function() {
        var InputData, newItem;
        InputData = UIController.getDomValue();
        newItem = budgetController.addItem(InputData.type, InputData.description, InputData.value);
        console.log(InputData.type)
        console.log(UIController.addListItem)
        budgetController.testing
        UIController.addListItem(newItem, InputData.type);
    }

    return {
        init: function() {
            console.log('Application has started')
            SetupEventListeners();
            // AddItemController();
        }
    }
    //1. get input data
    //2. add the item to the budget controller
    //3. add the item to UI
    //4. calculate the budget
    //5. displayBudget

})(budgetController, UIController);

appController.init();