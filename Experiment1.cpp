#include <iostream>
using namespace std;

template <class T, int size>
class Stack {
private:
    T arr[size];
    int top;

public:
    Stack() {
        top = -1;
    }

    bool isEmpty() {
        return top == -1;
    }

    bool isFull() {
        return top == size - 1;
    }

    void push(T value) {
        if (isFull()) {
            cout << "Stack Overflow! Cannot push " << value << endl;
        } else {
            arr[++top] = value;
            cout << value << " pushed into stack.\n";
        }
    }

    void pop() {
        if (isEmpty()) {
            cout << "Stack Underflow! Nothing to pop.\n";
        } else {
            cout << arr[top--] << " popped from stack.\n";
        }
    }

    T peek() {
        if (isEmpty()) {
            cout << "Stack is empty.\n";
            return T();
        } else {
            return arr[top];
        }
    }
};

int main() {
    Stack<int, 5> s;
    s.push(10);
    s.push(20);
    s.push(30);
    cout << "Top element: " << s.peek() << endl;
    s.pop();
    cout << "Top element after pop: " << s.peek() << endl;
    s.pop();
    s.pop();
    s.pop();
    return 0;
}
