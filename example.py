#!/usr/bin/env python3

import threading

def thread_function(name):
    print(f"Thread {name} is running")

def main():
    # Create two threads
    thread1 = threading.Thread(target=thread_function, args=("Thread-1",))
    thread2 = threading.Thread(target=thread_function, args=("Thread-2",))

    # Start the threads
    thread1.start()
    thread2.start()

    # Wait for the threads to finish
    thread1.join()
    thread2.join()

    print("All threads finished")

if __name__ == "__main__":
    main()