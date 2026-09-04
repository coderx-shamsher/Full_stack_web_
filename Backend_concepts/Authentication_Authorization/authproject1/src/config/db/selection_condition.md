To apply multiple conditions in a SELECT statement, use the AND and OR operators inside the WHERE clause.
Here are the three ways to combine conditions:
## 1. Match ALL Conditions (AND)
Both conditions must be true for a row to be selected.

SELECT * FROM users WHERE status = 'active' AND age >= 18;

## 2. Match ANY Condition (OR)
Only one of the conditions needs to be true for a row to be selected.

SELECT * FROM products WHERE category = 'Electronics' OR price < 20;

## 3. Combine AND & OR (Using Parentheses)
When mixing both, always use parentheses () to group your conditions so MySQL knows exactly how to evaluate them.

SELECT * FROM orders WHERE status = 'shipped' AND (total > 100 OR payment_method = 'PayPal');

------------------------------
## 💡 Quick Summary Reference

| Operator | Rule | Example Snippet |
|---|---|---|
| AND | All conditions must be true | WHERE country = 'US' AND status = 'active' |
| OR | At least one condition must be true | WHERE role = 'admin' OR role = 'editor' |
| IN | Shorthand for multiple ORs on one column | WHERE city IN ('New York', 'London', 'Tokyo') |

If you want me to write the exact query for you, let me know:

* What columns are you trying to filter by?
* What is the logic you want to apply (e.g., "Must be X and either Y or Z")?


