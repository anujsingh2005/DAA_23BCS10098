#include <iostream>
using namespace std;

struct DNode {
    int data;
    DNode* prev;
    DNode* next;
    DNode(int val) : data(val), prev(NULL), next(NULL) {}
};

class DoublyLinkedList {
private:
    DNode* head;

public:
    DoublyLinkedList() : head(NULL) {}

    void insertAtBeginning(int val) {
        DNode* newNode = new DNode(val);
        if (head) {
            newNode->next = head;
            head->prev = newNode;
        }
        head = newNode;
    }

    void insertAtEnd(int val) {
        DNode* newNode = new DNode(val);
        if (!head) {
            head = newNode;
            return;
        }
        DNode* temp = head;
        while (temp->next) temp = temp->next;
        temp->next = newNode;
        newNode->prev = temp;
    }

    void deleteAtBeginning() {
        if (!head) return;
        DNode* temp = head;
        head = head->next;
        if (head) head->prev = NULL;
        delete temp;
    }

    void deleteAtEnd() {
        if (!head) return;
        if (!head->next) {
            delete head;
            head = NULL;
            return;
        }
        DNode* temp = head;
        while (temp->next) temp = temp->next;
        temp->prev->next = NULL;
        delete temp;
    }

    void display() {
        DNode* temp = head;
        while (temp) {
            cout << temp->data << " <-> ";
            temp = temp->next;
        }
        cout << "NULL\n";
    }
};

int main() {
    cout << "\nDoubly Linked List:\n";
    DoublyLinkedList dll;
    dll.insertAtBeginning(10);
    dll.insertAtEnd(20);
    dll.insertAtBeginning(5);
    dll.display();
    dll.deleteAtBeginning();
    dll.display();
    dll.deleteAtEnd();
    dll.display();
}
