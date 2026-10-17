const T=[
{t:"Data <i>Types</i>",tag:"Unit 1 · Data types",p:"Every variable has a type that fixes how much memory it takes and which values it can hold. Start with three: int for whole numbers, float for decimals and char for a single character.",pts:["<code>int</code> — 4 bytes, roughly -2.1 billion to +2.1 billion","<code>float</code> — 4 bytes, about 6 digits of precision (<code>double</code> gives 8 bytes, 15 digits)","<code>char</code> — 1 byte, stores 'A' as its code 65"],f:"types.c",code:String.raw`#include <stdio.h>

int main(void) {
    int   marks = 87;
    float cgpa  = 8.65f;
    char  grade = 'A';
    printf("%d %.2f %c\n", marks, cgpa, grade);
    printf("%zu %zu %zu bytes\n", sizeof(int), sizeof(float), sizeof(char));
}`,out:"87 8.65 A / 4 4 1 bytes"},
{t:"Assignment <i>&amp; Arithmetic</i>",tag:"Unit 1 · Expressions",p:"The = operator stores the right-hand value in the left-hand variable; it is not a maths equation. Expressions follow precedence: * / % first, then + -, left to right, and brackets override everything. Swapping two values needs care, because assigning one destroys the other.",pts:["<code>7 / 2</code> is 3 for ints; use <code>7 / 2.0</code> for 3.5","<code>a += 5</code> is shorthand for <code>a = a + 5</code>","Swap with a temporary variable, or without one using arithmetic"],f:"expr.c",code:String.raw`int a = 10, b = 20, t;

t = a;  a = b;  b = t;        /* with temp    */

a = a + b;                    /* without temp */
b = a - b;
a = a - b;

int r = 2 + 3 * 4;            /* 14, not 20 */
int s = (2 + 3) * 4;          /* 20 */`,out:"a=10, b=20 (swapped twice); r=14, s=20"},
{t:"Decision <i>Making</i>",tag:"Unit 1 · if…else if…else",p:"Programs choose a path using conditions. The first true condition in an if…else if…else ladder runs, the rest are skipped, and else catches everything left over. Any non-zero value counts as true.",pts:["Conditions go inside <code>( )</code>; use braces for multi-line blocks","Order matters: test the most specific condition first","Never write <code>if (x = 5)</code> — that assigns instead of comparing"],f:"grade.c",code:String.raw`int marks = 82;

if (marks >= 90)
    printf("Grade A\n");
else if (marks >= 75)
    printf("Grade B\n");
else if (marks >= 40)
    printf("Grade C\n");
else
    printf("Fail\n");`,out:"Grade B"},
{t:"Boolean <i>Expressions</i>",tag:"Unit 1 · Conditions &amp; validation",p:"A Boolean expression combines relational operators (&lt; &gt; &lt;= &gt;= == !=) with logical operators (&amp;&amp; for AND, || for OR, ! for NOT). It evaluates to 1 (true) or 0 (false). This is how you validate input, check ranges and classify data.",pts:["Range check: <code>n >= 1 &amp;&amp; n <= 100</code>","Odd/even: <code>n % 2 == 0</code>; vowel check compares a char with a, e, i, o, u in both cases","Leap year: divisible by 4 and not by 100, or divisible by 400"],f:"bool.c",code:String.raw`int year = 2024;
if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
    printf("Leap year\n");

char c = 'e';
if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u'||
    c=='A'||c=='E'||c=='I'||c=='O'||c=='U')
    printf("Vowel\n");
else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'))
    printf("Consonant\n");`,out:"Leap year / Vowel"},
{t:"Input <i>&amp; Output</i>",tag:"Unit 1 · printf and scanf",p:"printf displays data and scanf reads it. Both use format specifiers that must match the variable’s type. scanf needs the address of the variable, so put & before it, except for strings.",pts:["<code>%d</code> int, <code>%f</code> float, <code>%c</code> char, <code>%s</code> string","<code>%.2f</code> prints two decimal places","Use <code>scanf(\" %c\", &amp;ch)</code> — the space skips leftover newlines"],f:"io.c",code:String.raw`#include <stdio.h>

int main(void) {
    int age;
    float height;
    char name[30];

    printf("Name, age, height: ");
    scanf("%s %d %f", name, &age, &height);
    printf("%s is %d years and %.1f m tall\n", name, age, height);
    return 0;
}`,out:"Asha is 18 years and 1.6 m tall"},
{t:"Switch <i>&amp; Menus</i>",tag:"Unit 1 · switch statement",p:"When one variable is compared against several fixed values, switch is cleaner than a long if…else if chain. Each case ends with break, otherwise execution falls through to the next case. It is the natural tool for menu-driven programs. Use if…else instead when conditions are ranges or complex expressions.",pts:["<code>switch</code> works on int and char, not float or ranges","<code>default</code> handles unexpected input","Menus run inside a loop until the user picks Exit"],f:"bank.c",code:String.raw`int ch;
printf("1.Deposit 2.Withdraw 3.Balance 4.Exit: ");
scanf("%d", &ch);

switch (ch) {
    case 1: printf("Deposit chosen\n");  break;
    case 2: printf("Withdraw chosen\n"); break;
    case 3: printf("Balance: %d\n", 500); break;
    case 4: printf("Bye\n");             break;
    default: printf("Invalid option\n");
}
/* triangle type: if (a==b && b==c) equilateral;
   else if (a==b || b==c || a==c) isosceles; else scalene */`,out:"Balance: 500"},
{t:"Problem <i>Decomposition</i>",tag:"Unit 2 · Functions",p:"Big problems become manageable when split into smaller sub-tasks, each solved by its own function. To calculate a student’s scorecard you need a total, an average and a grade: three small functions instead of one giant main. Choose the function type by asking what goes in and what comes out.",pts:["No arguments, no return: <code>void menu(void)</code>","Arguments, no return: <code>void show(int x)</code>","Arguments with return: <code>int add(int a, int b)</code>"],f:"score.c",code:String.raw`int   total(int a, int b, int c) { return a + b + c; }
float average(int t)             { return t / 3.0f; }
char  grade(float avg) {
    if (avg >= 75) return 'A';
    if (avg >= 50) return 'B';
    return 'C';
}

int main(void) {
    int t = total(80, 70, 90);
    printf("%d %.1f %c\n", t, average(t), grade(average(t)));
}`,out:"240 80.0 A"},
{t:"Pass by Value <i>&amp; Reference</i>",tag:"Unit 2 · Parameter passing",p:"By default C passes copies of arguments (pass by value), so changing a parameter does not change the caller’s variable. To modify the original, pass its address (pass by reference) and work through a pointer.",pts:["By value: safe, the original is untouched","By reference: pass <code>&amp;x</code>, receive <code>int *p</code>, change with <code>*p</code>","Use it when a function must return more than one result"],f:"pass.c",code:String.raw`void bad(int a, int b)   { int t = a; a = b; b = t; }  /* no effect */
void good(int *a, int *b){ int t = *a; *a = *b; *b = t; } /* swaps  */

int sumEven(int n) {          /* by value: sum of first n even numbers */
    int s = 0;
    for (int i = 1; i <= n; i++) s += 2 * i;
    return s;
}

int x = 1, y = 2;
good(&x, &y);                 /* x=2, y=1 */`,out:"x=2 y=1 / sumEven(4)=20"},
{t:"<i>Pointers</i>",tag:"Unit 2 · Memory addresses",p:"A pointer is a variable that stores the memory address of another variable. The & operator gives an address and * (dereference) reaches the value stored there. Pointers make pass by reference possible and are the foundation for arrays, strings and dynamic memory.",pts:["Declare: <code>int *p;</code> — read as 'p points to an int'","<code>p = &amp;x;</code> then <code>*p = 50;</code> changes x","Initialise to <code>NULL</code> if not yet pointing anywhere"],f:"ptr.c",code:String.raw`int x = 10;
int *p = &x;

printf("x = %d\n", x);
printf("address = %p\n", (void *)&x);
printf("*p = %d\n", *p);

*p = 50;                 /* writes into x */
printf("x = %d\n", x);`,out:"x = 10 ... *p = 10 ... x = 50"},
{t:"Helper <i>Functions</i>",tag:"Unit 2 · Modular design &amp; return values",p:"A helper function does one small job and returns a result so bigger functions stay readable. Return a value when you have a single answer; use pointers for several. Typical examples: check if a number is prime, find a grade, or convert units.",pts:["Return 1/0 from checker functions such as <code>isPrime</code>","Reuse helpers: <code>calculateAverage()</code> can call <code>calculateTotal()</code>","Convert: F = C × 9/5 + 32 and K = C + 273.15"],f:"helper.c",code:String.raw`int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}
float cToF(float c) { return c * 9 / 5 + 32; }
float cToK(float c) { return c + 273.15f; }

int main(void) {
    printf("%d %d\n", isPrime(7), isPrime(10));
    printf("%.1f F, %.2f K\n", cToF(37), cToK(37));
}`,out:"1 0 / 98.6 F, 310.15 K"},
{t:"<i>Recursion</i>",tag:"Unit 2 · Thinking recursively",p:"A recursive function solves a problem by calling itself on a smaller version of the same problem. Every recursive function needs a base case that stops the calls and a recursive case that moves toward it. Each call waits on the call stack, then results are returned back in reverse order.",pts:["factorial(n) = n × factorial(n-1), base case factorial(0) = 1","Fibonacci: fib(n) = fib(n-1) + fib(n-2)","GCD (Euclid): gcd(a, b) = gcd(b, a % b), stops when b is 0"],f:"recur.c",code:String.raw`int fact(int n) {
    if (n == 0) return 1;           /* base case */
    return n * fact(n - 1);         /* smaller problem */
}
int digits(int n)  { return n < 10 ? 1 : 1 + digits(n / 10); }
int gcd(int a, int b) { return b == 0 ? a : gcd(b, a % b); }
int fib(int n)     { return n < 2 ? n : fib(n-1) + fib(n-2); }

/* fact(3) -> 3*fact(2) -> 3*2*fact(1) -> 3*2*1*fact(0) = 6 */`,out:"fact(5)=120, digits(12345)=5, gcd(48,18)=6"},
{t:"One-Dimensional <i>Arrays</i>",tag:"Unit 3 · Arrays",p:"An array stores several values of the same type under one name, in consecutive memory locations. Elements are reached by index starting at 0, and the address of element i is the base address plus i × size. C does not check bounds, so staying inside 0 to n-1 is your job.",pts:["Declare and initialise: <code>int a[5] = {4, 8, 15, 16, 23};</code>","Contiguous memory means <code>&amp;a[1]</code> is exactly 4 bytes after <code>&amp;a[0]</code>","Linear search scans each element until it finds the key"],f:"array.c",code:String.raw`int a[5] = {4, 8, 15, 16, 23};
int n = 5, key = 15, pos = -1;

for (int i = 0; i < n; i++)          /* linear search */
    if (a[i] == key) { pos = i; break; }

for (int i = n - 1; i >= 0; i--)     /* print in reverse */
    printf("%d ", a[i]);

int count[10] = {0};                 /* frequency of digits 0-9 */
for (int i = 0; i < n; i++) count[a[i] % 10]++;`,out:"found at index 2 / 23 16 15 8 4"},
{t:"<i>Strings</i>",tag:"Unit 3 · Strings &amp; string.h",p:"A string in C is a char array that ends with the null character '\\0'. Include <string.h> for ready-made functions. Always leave space for the null terminator when declaring the array.",pts:["<code>strlen(s)</code> length, <code>strcmp(a,b)</code> returns 0 if equal, <code>strcpy(d,s)</code> copy","<code>strcat(d,s)</code> append, <code>strrev(s)</code> reverse (non-standard, often manual)","<code>strchr(s,c)</code> finds a character, <code>strstr(s,t)</code> finds a substring"],f:"string.c",code:String.raw`#include <string.h>

char s1[30] = "Hello", s2[10] = " World";
printf("%zu\n", strlen(s1));          /* 5 */
strcat(s1, s2);                       /* Hello World */
printf("%d\n", strcmp("abc", "abd")); /* negative */
printf("%s\n", strchr(s1, 'W'));      /* World */
printf("%s\n", strstr(s1, "lo"));     /* lo World */

char r[30];
strcpy(r, s1);                        /* copy into r */`,out:"5 / negative / World / lo World"},
{t:"Recursion with <i>Arrays &amp; Strings</i>",tag:"Unit 3 · Pointers in arrays and strings",p:"An array name acts as a pointer to its first element, so a[i] is the same as *(a + i). Recursion walks an array or string by handling one element and passing the rest (a + 1, or index + 1) to the next call. A helper function often carries the index.",pts:["Length without <code>strlen</code>: 0 at '\\0', else 1 + length of the rest","Maximum of an array: compare first element with max of the rest","Reverse a string by recursing on the index and printing on the way back"],f:"rec_str.c",code:String.raw`int len(char *s) { return *s == '\0' ? 0 : 1 + len(s + 1); }

int maxArr(int a[], int n) {
    if (n == 1) return a[0];
    int m = maxArr(a + 1, n - 1);
    return a[0] > m ? a[0] : m;
}
int vowels(char *s) {
    if (*s == '\0') return 0;
    return (strchr("aeiouAEIOU", *s) != NULL) + vowels(s + 1);
}
void rev(char *s, int i) {        /* helper with index */
    if (s[i] == '\0') return;
    rev(s, i + 1);
    putchar(s[i]);
}`,out:"len=5, max=23, vowels('education')=5, rev('abc')=cba"},
{t:"Loops: <i>while, do-while, for</i>",tag:"Unit 3 · Iteration",p:"Loops repeat work. Use for when the count is known, while when you loop until a condition fails, and do-while when the body must run at least once, such as showing a menu or validating input. Many problems are just a loop plus a running variable: sum, count, largest.",pts:["<code>for (init; condition; update)</code> with step <code>i += 2</code> or <code>i--</code>","<code>while</code> checks first; <code>do-while</code> checks after the body","Generate sequences, running totals and the largest of many inputs"],f:"loops.c",code:String.raw`for (int i = 1; i <= 10; i += 3) printf("%d ", i);   /* 1 4 7 10 */

int n, big = 0;
do {                                   /* runs at least once */
    printf("Enter number (0 to stop): ");
    scanf("%d", &n);
    if (n > big) big = n;
} while (n != 0);

int x = 25, root = 1;                  /* perfect square? */
while (root * root < x) root++;
printf(root * root == x ? "square\n" : "no\n");`,out:"1 4 7 10 ... square"},
{t:"Nested <i>Loops</i>",tag:"Unit 4 · Loops inside loops",p:"A nested loop puts one loop inside another. For each pass of the outer loop, the inner loop runs completely, so the body executes outer × inner times. They print patterns and process tables. Tracing means writing the variables down step by step.",pts:["3 outer × 4 inner = 12 executions of the inner body","Outer loop = rows, inner loop = columns","Hollow square: print * only on the border, spaces inside"],f:"pattern.c",code:String.raw`int n = 5;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= n; j++) {
        if (i == 1 || i == n || j == 1 || j == n)
            printf("* ");
        else
            printf("  ");
    }
    printf("\n");
}`,out:"a 5 × 5 hollow square of stars"},
{t:"Two-Dimensional <i>Arrays</i>",tag:"Unit 4 · Matrices",p:"A 2-D array is a table with rows and columns: a[row][col]. Nested loops traverse it. Typical tasks are row sums, column sums and diagonals. A sparse matrix is one where most elements are zero, usually defined as more than half of them.",pts:["Declare <code>int m[3][3];</code>; element at row i, column j is <code>m[i][j]</code>","Main diagonal: <code>i == j</code>; other diagonal: <code>i + j == 2</code>","Sparse test: count zeros and compare with half of the total"],f:"matrix.c",code:String.raw`int m[3][3] = {{1,0,0},{0,5,0},{7,0,9}};
int d1 = 0, d2 = 0, zeros = 0;

for (int i = 0; i < 3; i++) {
    int row = 0, col = 0;
    for (int j = 0; j < 3; j++) {
        row += m[i][j];  col += m[j][i];
        if (m[i][j] == 0) zeros++;
    }
    printf("row %d = %d, col %d = %d\n", i, row, i, col);
    d1 += m[i][i];  d2 += m[i][2 - i];
}
printf(zeros > 9 / 2 ? "sparse\n" : "not sparse\n");`,out:"row 0 = 1, col 0 = 8 ... sparse"},
{t:"Bubble <i>Sort</i>",tag:"Unit 4 · Sorting",p:"Bubble sort repeatedly compares neighbouring elements and swaps them if they are out of order. After each pass the largest remaining value 'bubbles' to the end. With n elements it needs up to n-1 passes. It is simple but slow for large data.",pts:["Outer loop: passes; inner loop: adjacent comparisons","Each pass fixes one element, so the inner loop shrinks by 1","Add a swapped flag to stop early if no swap happens"],f:"bubble.c",code:String.raw`int a[5] = {5, 1, 4, 2, 8};
int n = 5;

for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - 1 - i; j++) {
        if (a[j] > a[j + 1]) {
            int t = a[j];
            a[j] = a[j + 1];
            a[j + 1] = t;
        }
    }
}
for (int i = 0; i < n; i++) printf("%d ", a[i]);`,out:"1 2 4 5 8"},
{t:"Recursion <i>vs Iteration</i>",tag:"Unit 4 · Memory and performance",p:"Any recursive solution can be written with a loop. Recursion is elegant but every call adds a stack frame, costing memory and time, and very deep recursion can overflow the stack. Iteration uses constant extra memory. Naive recursive Fibonacci recomputes the same values again and again.",pts:["Factorial: recursive uses n stack frames; the loop uses just one variable","Binary search halves a sorted array each step, recursively or with a loop","Palindrome and sum-of-digits are easy both ways; compare the number of steps"],f:"compare.c",code:String.raw`int powRec(int a, int n)  { return n == 0 ? 1 : a * powRec(a, n - 1); }
int powLoop(int a, int n) { int r = 1; while (n--) r *= a; return r; }

int bsearch_r(int a[], int lo, int hi, int key) {
    if (lo > hi) return -1;
    int mid = (lo + hi) / 2;
    if (a[mid] == key) return mid;
    return a[mid] < key ? bsearch_r(a, mid + 1, hi, key)
                        : bsearch_r(a, lo, mid - 1, key);
}
/* same idea with while (lo <= hi) uses no extra stack */`,out:"pow(2,5)=32 both ways, key 16 found at index 3"},
{t:"break <i>&amp; continue</i>",tag:"Unit 4 · Loop control",p:"break leaves the loop immediately, useful when a stopping condition occurs, such as the user entering a negative number. continue skips the rest of the current pass and jumps to the next one, useful for ignoring unwanted values.",pts:["<code>break</code> exits only the innermost loop","<code>continue</code> in a <code>for</code> still runs the update step","Example: print 1 to 20 except multiples of 4"],f:"control.c",code:String.raw`for (int i = 1; i <= 20; i++) {
    if (i % 4 == 0) continue;     /* skip 4, 8, 12 ... */
    printf("%d ", i);
}

int n, sum = 0;
while (1) {
    scanf("%d", &n);
    if (n < 0) break;             /* stop on negative */
    sum += n;
}
printf("sum = %d\n", sum);`,out:"1 2 3 5 6 7 9 10 11 13 ..."},
{t:"<i>Structures</i>",tag:"Unit 5 · Grouping data",p:"A structure groups variables of different types under one name, ideal for a record such as a student or employee. Declare the type once, create variables from it, and access fields with the dot operator. An array of structures stores many records.",pts:["Access fields with <code>s.name</code> (or <code>p->name</code> via a pointer)","<code>typedef</code> lets you write <code>Student</code> instead of <code>struct Student</code>","Array of structures = a small table of records"],f:"struct.c",code:String.raw`typedef struct {
    int   id;
    char  name[20];
    float marks;
} Student;

Student s[3] = {{1, "Asha", 82.5f}, {2, "Ravi", 74.0f}, {3, "Meena", 91.0f}};

for (int i = 0; i < 3; i++)
    printf("%d %s %.1f\n", s[i].id, s[i].name, s[i].marks);`,out:"1 Asha 82.5 / 2 Ravi 74.0 / 3 Meena 91.0"},
{t:"Structures <i>&amp; Functions</i>",tag:"Unit 5 · Modular programming",p:"Structures can be passed to functions by value (a copy) or by reference (a pointer, so changes stick) and can be returned from functions. Combining them with arrays of structures gives modular programs: separate functions to read, update, search and display records.",pts:["By value: <code>void show(Employee e)</code>","By reference: <code>void giveRaise(Employee *e)</code> and <code>e->salary</code>","Return a structure or a pointer to the found record, NULL if not found"],f:"emp.c",code:String.raw`typedef struct { int id; float salary; } Employee;

Employee giveRaise(Employee e, float pct) {   /* returns updated copy */
    e.salary += e.salary * pct / 100;
    return e;
}
Employee *find(Employee a[], int n, int id) {   /* search by ID */
    for (int i = 0; i < n; i++)
        if (a[i].id == id) return &a[i];
    return NULL;
}
void bonus(Employee *e) { e->salary += 500; }  /* by reference */`,out:"find(101) -> record, find(999) -> NULL"},
{t:"Dynamic Memory <i>Allocation</i>",tag:"Unit 5 · malloc, calloc, realloc, free",p:"Normal arrays need a fixed size at compile time. Dynamic allocation requests memory from the heap at run time, which suits unpredictable or large inputs. Include <stdlib.h>. Always check for NULL and free the memory when done, or you leak it.",pts:["<code>malloc(n * sizeof(int))</code> — uninitialised memory","<code>calloc(n, sizeof(int))</code> — all zeros","<code>realloc(p, newSize)</code> grows or shrinks; <code>free(p)</code> releases"],f:"dynamic.c",code:String.raw`#include <stdlib.h>

int n;
scanf("%d", &n);
int *a = malloc(n * sizeof(int));
if (a == NULL) return 1;

int sum = 0;
for (int i = 0; i < n; i++) { scanf("%d", &a[i]); sum += a[i]; }
printf("sum = %d\n", sum);

a = realloc(a, (n + 5) * sizeof(int));   /* add 5 more elements */
free(a);
a = NULL;`,out:"sum = 60 (for 10 20 30)"},
{t:"File <i>Handling</i>",tag:"Unit 5 · fopen, fscanf, fgets, feof, fclose",p:"Files store data beyond program execution. Open a file with fopen, read or write with fscanf, fgets or fprintf, test the end with feof, and always close it with fclose. fopen returns NULL on failure, so check it. Reading line by line is the basis for counting characters, words, lines or building a frequency report.",pts:["Modes: <code>\"r\"</code> read, <code>\"w\"</code> write (erases), <code>\"a\"</code> append","<code>fscanf(f, \"%d\", &amp;x)</code> returns how many items it read","<code>fgets(buf, size, f)</code> reads one whole line"],f:"count.c",code:String.raw`FILE *f = fopen("data.txt", "r");
if (f == NULL) { printf("Cannot open\n"); return 1; }

char line[200];
int lines = 0, chars = 0, words = 0, inWord = 0;
while (fgets(line, sizeof line, f)) {
    lines++;
    for (int i = 0; line[i]; i++) {
        chars++;
        if (line[i] == ' ' || line[i] == '\n' || line[i] == '\t')
            inWord = 0;
        else if (!inWord) { inWord = 1; words++; }
    }
}
fclose(f);
printf("%d lines, %d words, %d chars\n", lines, words, chars);`,out:"3 lines, 14 words, 71 chars"}
];
const $=s=>document.querySelector(s);
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const re=/(\/\*[\s\S]*?\*\/|\/\/.*|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])')|\b(int|char|float|double|void|unsigned|const|static|struct|union|enum|typedef|return|if|else|for|while|do|switch|case|default|break|continue|sizeof|NULL|uint8_t|FILE|Color|Person|long|short|Student|Emp|Book|Product|Employee)\b|\b(\d+\.?\d*u?)\b/g;
const hl=c=>esc(c).replace(re,(m,a,b,k,n)=>a?(a[0]=="#"&&a[1]!="!"&&!/^#\s/.test(a)?`<span class="p">${a}</span>`:`<span class="c">${a}</span>`):b?`<span class="s">${b}</span>`:k?`<span class="k">${k}</span>`:`<span class="n">${n}</span>`);
const main=$("#main"),nav=$("#nav");
T.forEach((d,i)=>{
 const n=String(i+1).padStart(2,"0"),id="c"+n;
 main.insertAdjacentHTML("beforeend",`<section class="pg" id="${id}"><div class="num" data-s>${n}</div>
 <div class="txt"><div class="tag rv">Chapter ${n} / ${String(T.length).padStart(2,"0")} — ${d.tag}</div><h2 class="rv">${d.t}</h2><p class="rv">${d.p}</p><ul class="pts rv">${d.pts.map(x=>`<li>${x}</li>`).join("")}</ul><a class="more rv" href="#/c/${i+1}">Open full lesson →</a></div>
 <div class="cb rv"><div class="h"><i></i><i></i><i></i><span>${d.f}</span></div><pre>${hl(d.code)}</pre><div class="out">${esc(d.out)}</div></div></section>`);
 nav.insertAdjacentHTML("beforeend",`<a href="#${id}" aria-label="${d.tag}"><span>${n} ${d.tag}</span></a>`);
});
const words=["data types","expressions","if else","switch","functions","pointers","recursion","arrays","strings","loops","matrices","bubble sort","structures","malloc","files"];
const row=words.map((w,i)=>i%3==0?`<span><em>${w}</em></span>`:`<span>${w}</span>`).join("·");
$("#mq").innerHTML=row+row;
const secs=[...document.querySelectorAll("section.pg")],dots=[...nav.children];
const io1=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.12});
const io2=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)dots.forEach((d,i)=>d.classList.toggle("on",secs[i]===e.target))}),{rootMargin:"-45% 0px -45% 0px"});
secs.forEach(x=>{io1.observe(x);io2.observe(x)});
const bar=$("#bar"),h1=$(".hero h1");
function tick(){
 const y=scrollY,m=document.documentElement.scrollHeight-innerHeight;
 bar.style.width=(y/m*100)+"%";
 h1.style.transform=`translateY(${y*.25}px) scale(${1+y/4000})`;
 secs.forEach(s=>{const r=s.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){s.firstElementChild.style.transform=`translateY(${-r.top*.18}px)`}});
}
addEventListener("scroll",()=>requestAnimationFrame(tick),{passive:true});tick();
const root=document.documentElement;
try{const v=localStorage.getItem("theme");if(v)root.dataset.theme=v}catch(e){}
$("#tog").onclick=()=>{
 const dark=root.dataset.theme?root.dataset.theme=="dark":matchMedia("(prefers-color-scheme:dark)").matches;
 root.dataset.theme=dark?"light":"dark";
 try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}
};
const D=[
{d:"Size decides range. A signed 4-byte <code>int</code> holds -2,147,483,648 to 2,147,483,647; go past it and the value wraps around (overflow). <code>float</code> keeps only 6–7 significant digits, so <code>0.1f + 0.2f</code> is not exactly 0.3 — use <code>double</code> when precision matters. <code>char</code> is really a small integer, so <code>'A' + 1</code> is 66 and prints as 'B' with <code>%c</code>. Pick the smallest type that safely fits your data.",q:[["A school app stores a student’s roll number, CGPA and section letter. Declare suitable variables, assign sample values and print them on one line.",String.raw`int roll = 21;
float cgpa = 8.7f;
char section = 'B';
printf("Roll %d, CGPA %.1f, Section %c\n", roll, cgpa, section);`],["A shop’s yearly sales may reach 5 billion rupees. Show why int is a poor choice and what you would use instead.",String.raw`/* int max is about 2.1 billion, so 5 billion overflows. */
long long sales = 5000000000LL;
printf("Sales = %lld\n", sales);`]]},
{d:"C evaluates <code>* / %</code> before <code>+ -</code>, left to right; brackets win over everything. Both operands being int means integer division, which drops the fraction: <code>5/2</code> is 2, while <code>5/2.0</code> is 2.5. Compound operators (<code>+=  -=  *=</code>) shorten updates. To swap, a temporary variable is the safe way; the add/subtract trick works too but can overflow with huge values.",q:[["A cashier sells 3 items at Rs 249 each with 18% GST. Compute and print the total bill.",String.raw`int price = 249, qty = 3;
float sub = price * qty;
float total = sub + sub * 18 / 100;
printf("Total = %.2f\n", total);`],["Ria has Rs 500 and Sam has Rs 300. Swap their amounts without using a third variable.",String.raw`int ria = 500, sam = 300;
ria = ria + sam;     /* 800 */
sam = ria - sam;     /* 500 */
ria = ria - sam;     /* 300 */
printf("Ria %d, Sam %d\n", ria, sam);`]]},
{d:"An if…else if ladder is checked top to bottom and stops at the first true condition, so put the strictest test first. Using else makes sure exactly one branch runs. A frequent bug is <code>if (x = 5)</code>, which assigns 5 and is always true. Nested ifs are fine, but a flat ladder is usually easier to read.",q:[["Electricity bill: first 100 units cost Rs 3 each, the next 100 cost Rs 5, anything above 200 costs Rs 8. Read the units and print the bill.",String.raw`int u; float bill;
scanf("%d", &u);
if (u <= 100)      bill = u * 3;
else if (u <= 200) bill = 100 * 3 + (u - 100) * 5;
else               bill = 100 * 3 + 100 * 5 + (u - 200) * 8;
printf("Bill = Rs %.2f\n", bill);`],["Movie ticket price: under 5 years free, 5–12 Rs 100, 13–59 Rs 200, 60 and above Rs 120.",String.raw`int age, price;
scanf("%d", &age);
if (age < 5)       price = 0;
else if (age <= 12) price = 100;
else if (age <= 59) price = 200;
else               price = 120;
printf("Ticket = Rs %d\n", price);`]]},
{d:"Relational operators give 1 or 0, and <code>&amp;&amp;</code>, <code>||</code>, <code>!</code> combine them. C short-circuits: in <code>a &amp;&amp; b</code>, b is skipped if a is false. Writing <code>1 <= x <= 10</code> does not work as in maths; write <code>x >= 1 &amp;&amp; x <= 10</code>. Characters compare by code, so <code>c >= 'a' &amp;&amp; c <= 'z'</code> detects lowercase letters.",q:[["Loan eligibility: the applicant must be 21–60 years old with monthly income of at least Rs 25,000, OR have a guarantor (1 = yes).",String.raw`int age, income, g;
scanf("%d %d %d", &age, &income, &g);
if ((age >= 21 && age <= 60 && income >= 25000) || g == 1)
    printf("Eligible\n");
else
    printf("Not eligible\n");`],["Read one character and say whether it is a digit, uppercase letter, lowercase letter or special symbol.",String.raw`char c;
scanf(" %c", &c);
if (c >= '0' && c <= '9')      printf("Digit\n");
else if (c >= 'A' && c <= 'Z') printf("Uppercase\n");
else if (c >= 'a' && c <= 'z') printf("Lowercase\n");
else                           printf("Special symbol\n");`]]},
{d:"<code>printf</code> format specifiers must match the argument type: <code>%d</code> int, <code>%f</code> float, <code>%lf</code> double (in scanf), <code>%c</code> char, <code>%s</code> string. Width and precision shape the output, e.g. <code>%8.2f</code>. <code>scanf</code> writes into memory, so it needs addresses (<code>&amp;x</code>); array names already are addresses. <code>%s</code> stops at the first space; use <code>fgets</code> for whole lines. Check <code>scanf</code>’s return value to detect bad input.",q:[["Read the radius of a circular pizza and print its area and circumference to 2 decimal places.",String.raw`float r;
scanf("%f", &r);
printf("Area = %.2f\n", 3.14159f * r * r);
printf("Circumference = %.2f\n", 2 * 3.14159f * r);`],["Read a student’s name and marks in 3 subjects (out of 100 each); print the name and percentage.",String.raw`char name[30]; int a, b, c;
scanf("%s %d %d %d", name, &a, &b, &c);
printf("%s scored %.1f%%\n", name, (a + b + c) / 3.0);`]]},
{d:"<code>switch</code> compares one int or char expression against constant cases. Without <code>break</code> execution <em>falls through</em> into the next case; this is sometimes useful (grouping cases) and often a bug. <code>default</code> catches everything else. Use switch for fixed choices such as menus and grades; use if…else for ranges and combined conditions, which switch cannot express.",q:[["Build a calculator: read two numbers and an operator (+ - * /) and print the result. Handle division by zero.",String.raw`float a, b; char op;
scanf("%f %c %f", &a, &op, &b);
switch (op) {
    case '+': printf("%.2f\n", a + b); break;
    case '-': printf("%.2f\n", a - b); break;
    case '*': printf("%.2f\n", a * b); break;
    case '/':
        if (b == 0) printf("Cannot divide by zero\n");
        else printf("%.2f\n", a / b);
        break;
    default: printf("Invalid operator\n");
}`],["Traffic signal: read R, Y or G (either case) and print Stop, Get ready or Go.",String.raw`char s;
scanf(" %c", &s);
switch (s) {
    case 'R': case 'r': printf("Stop\n");      break;
    case 'Y': case 'y': printf("Get ready\n"); break;
    case 'G': case 'g': printf("Go\n");        break;
    default: printf("Invalid\n");
}`]]},
{d:"Decomposition means: list what the program must do, give each task a function, and keep <code>main</code> as the coordinator. Four function shapes exist: (1) no input, no output, (2) input, no output, (3) no input, output, (4) input and output. Most useful helpers are type 4 — they take data and return a result, which makes them easy to test on their own and to reuse. Declare a prototype before <code>main</code> if the function is defined after it.",q:[["A canteen bill has three parts: item total, 5% GST and a Rs 20 discount when the bill exceeds Rs 200. Write a function for each part and print the final amount.",String.raw`float itemTotal(float p, int q) { return p * q; }
float gst(float amt)            { return amt * 5 / 100; }
float discount(float amt)       { return amt > 200 ? 20 : 0; }

int main(void) {
    float t = itemTotal(60, 4);
    float final = t + gst(t) - discount(t);
    printf("Pay Rs %.2f\n", final);   /* 240+12-20 = 232 */
}`],["For a road trip, write functions to compute fuel needed (distance ÷ mileage) and fuel cost, then print both.",String.raw`float fuelNeeded(float km, float kmpl) { return km / kmpl; }
float fuelCost(float litres, float rate) { return litres * rate; }

int main(void) {
    float l = fuelNeeded(300, 15);
    printf("%.1f litres, Rs %.2f\n", l, fuelCost(l, 100));
}`]]},
{d:"Pass by value copies the argument, so the function cannot change the caller’s variable. Pass by reference sends the variable’s address; the function receives a pointer and changes the original with <code>*p</code>. Use value for small inputs you only read, and reference when you need to modify the caller’s data or return several results. Forgetting the <code>&amp;</code> in the call is the usual mistake.",q:[["Write transfer(&from, &to, amount) that moves money between accounts only if the balance is enough.",String.raw`void transfer(int *from, int *to, int amt) {
    if (*from >= amt) { *from -= amt; *to += amt; }
    else printf("Insufficient balance\n");
}

int main(void) {
    int a = 1000, b = 200;
    transfer(&a, &b, 300);
    printf("%d %d\n", a, b);   /* 700 500 */
}`],["Write a function that gives both the quotient and the remainder of two numbers to the caller.",String.raw`void divide(int a, int b, int *q, int *r) {
    *q = a / b;
    *r = a % b;
}

int main(void) {
    int q, r;
    divide(17, 5, &q, &r);
    printf("%d remainder %d\n", q, r);   /* 3 remainder 2 */
}`]]},
{d:"Every variable lives at an address. <code>&amp;x</code> gives it; a pointer variable stores it; <code>*p</code> follows it back to the value. The pointer’s type tells C how many bytes to read and how far <code>p + 1</code> moves (<code>sizeof(type)</code> bytes). An uninitialised pointer holds garbage and dereferencing it crashes; use <code>NULL</code> when it points nowhere and test before use.",q:[["A shop gives 10% off. Write a function that takes a pointer to a float price and reduces it in place.",String.raw`void applyDiscount(float *price) {
    *price = *price - *price * 10 / 100;
}

int main(void) {
    float p = 500;
    applyDiscount(&p);
    printf("%.2f\n", p);   /* 450.00 */
}`],["Declare an int pointer to a variable holding a score of 40; use the pointer to add 5 grace marks and print the score.",String.raw`int score = 40;
int *p = &score;
*p = *p + 5;
printf("%d\n", score);   /* 45 */`]]},
{d:"A good helper does one job, has a clear name, and returns a value instead of printing, so it can be reused anywhere. Checker functions return 1 or 0 (<code>isPrime</code>, <code>isLeap</code>). To test primality you only need divisors up to √n. Keep input and output in <code>main</code> and calculations in helpers — this is the core of modular design.",q:[["Library fine: Rs 2 per day for the first 7 days late and Rs 5 per day after that. Write fine(daysLate).",String.raw`int fine(int d) {
    if (d <= 7) return d * 2;
    return 7 * 2 + (d - 7) * 5;
}

int main(void) {
    printf("Fine = Rs %d\n", fine(10));   /* 14 + 15 = 29 */
}`],["Print all prime numbers between 1 and 50 using an isPrime helper.",String.raw`int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}

int main(void) {
    for (int i = 1; i <= 50; i++)
        if (isPrime(i)) printf("%d ", i);
}`]]},
{d:"Recursive thinking: define the answer for the smallest case (base case), then express a bigger case using a smaller one. Always check the base case first and make sure each call moves toward it, or the program recurses forever and crashes with a stack overflow. The call stack stores each waiting call; when the base case returns, results multiply or add back up. Tracing <code>fact(3)</code> on paper is the best way to understand it.",q:[["An OTP is 4821. Use recursion to compute the sum of its digits.",String.raw`int digitSum(int n) {
    if (n == 0) return 0;                  /* base case */
    return n % 10 + digitSum(n / 10);      /* last digit + rest */
}

int main(void) {
    printf("%d\n", digitSum(4821));        /* 15 */
}`],["A rabbit pair breeds so that pairs follow the Fibonacci pattern (1, 1, 2, 3, 5...). Write a recursive function for the pairs in month n.",String.raw`int pairs(int n) {
    if (n <= 2) return 1;
    return pairs(n - 1) + pairs(n - 2);
}

int main(void) {
    printf("%d\n", pairs(7));   /* 13 */
}`]]},
{d:"An array is a numbered row of boxes of one type, stored side by side in memory, so <code>a[i]</code> is found by simple arithmetic. Valid indexes are 0 to n-1; C will not warn you about <code>a[n]</code>, it silently corrupts memory. Unfilled elements of a partly initialised array become 0. When passing an array to a function, also pass its size, because the function only receives an address.",q:[["Store the temperatures of 7 days. Print the highest, lowest and average.",String.raw`float t[7], hi, lo, sum = 0;
for (int i = 0; i < 7; i++) {
    scanf("%f", &t[i]);
    sum += t[i];
}
hi = lo = t[0];
for (int i = 1; i < 7; i++) {
    if (t[i] > hi) hi = t[i];
    if (t[i] < lo) lo = t[i];
}
printf("High %.1f Low %.1f Avg %.1f\n", hi, lo, sum / 7);`],["An attendance list holds roll numbers present. Search for a roll number and print its position or 'Absent'.",String.raw`int roll[6] = {3, 9, 12, 15, 21, 30}, key, pos = -1;
scanf("%d", &key);
for (int i = 0; i < 6; i++)
    if (roll[i] == key) { pos = i; break; }
if (pos >= 0) printf("Present at position %d\n", pos);
else          printf("Absent\n");`]]},
{d:"A string is a <code>char</code> array ended by <code>'\\0'</code>, so <code>\"Hi\"</code> needs 3 bytes. You cannot assign or compare strings with <code>=</code> or <code>==</code>; use <code>strcpy</code> and <code>strcmp</code> (0 means equal). <code>strcat</code> and <code>strcpy</code> do not check space, so size the destination generously. <code>strchr</code> returns a pointer to the first match or <code>NULL</code>, and <code>strstr</code> does the same for a substring.",q:[["A username must not contain a space. Read a word with fgets and report its length and whether it has a space.",String.raw`char u[50];
fgets(u, sizeof u, stdin);
u[strcspn(u, "\n")] = '\0';          /* remove newline */
printf("Length = %zu\n", strlen(u));
if (strchr(u, ' ')) printf("Spaces not allowed\n");
else                printf("Valid\n");`],["Read a password and a confirm-password; print whether they match.",String.raw`char p1[30], p2[30];
scanf("%s %s", p1, p2);
if (strcmp(p1, p2) == 0) printf("Passwords match\n");
else                     printf("Passwords differ\n");`]]},
{d:"A recursive step on an array handles element 0 and recurses on the rest (<code>a + 1</code>, <code>n - 1</code>), or carries an index. For strings, recursion stops at <code>'\\0'</code>. The pointer form <code>*(a + i)</code> is identical to <code>a[i]</code>, which is why arrays and pointers feel interchangeable. Recursion is clear but uses stack space for every element.",q:[["Count the capital letters in a sentence recursively.",String.raw`int caps(char *s) {
    if (*s == '\0') return 0;
    return (*s >= 'A' && *s <= 'Z') + caps(s + 1);
}

int main(void) {
    printf("%d\n", caps("Hello World From C"));   /* 4 */
}`],["Add up a month’s 5 daily expenses stored in an array using recursion.",String.raw`int total(int a[], int n) {
    if (n == 0) return 0;
    return a[n - 1] + total(a, n - 1);
}

int main(void) {
    int e[5] = {120, 80, 45, 200, 60};
    printf("%d\n", total(e, 5));   /* 505 */
}`]]},
{d:"<code>for</code> keeps init, test and update in one line, ideal for counting. <code>while</code> tests before each pass, so it may run zero times; <code>do-while</code> tests after, so it always runs once — perfect for menus and input validation. Make sure something inside the loop changes the condition, or it never ends. Typical patterns: accumulate a sum, count matches, track a maximum.",q:[["You save Rs 100 more each month, starting with Rs 100. In how many months does your total exceed Rs 1000?",String.raw`int saved = 0, dep = 100, months = 0;
while (saved <= 1000) {
    saved += dep;
    dep += 100;
    months++;
}
printf("%d months\n", months);   /* 100+200+...: 5 months = 1500 */`],["Keep asking for a PIN until the user enters 1234.",String.raw`int pin;
do {
    printf("Enter PIN: ");
    scanf("%d", &pin);
} while (pin != 1234);
printf("Access granted\n");`]]},
{d:"For every pass of the outer loop the inner loop runs completely, so the inner body executes outer × inner times. Outer usually means rows, inner means columns. In triangle patterns the inner limit depends on the outer counter (<code>j <= i</code>). To trace, write a small table of <code>i</code> and <code>j</code> values; it makes both output and iteration count obvious.",q:[["A hall has 5 rows where row i has i seats. Print the seating layout with seat numbers.",String.raw`for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++)
        printf("%d ", j);
    printf("\n");
}`],["Print the multiplication tables of 1 to 5 up to ×10 in a grid.",String.raw`for (int i = 1; i <= 10; i++) {
    for (int t = 1; t <= 5; t++)
        printf("%3d", t * i);
    printf("\n");
}`]]},
{d:"<code>int m[R][C]</code> is R rows of C columns stored row by row in memory. Two nested loops visit every cell; swapping which loop is outer changes between row-wise and column-wise traversal. On a square matrix, the main diagonal has <code>i == j</code> and the anti-diagonal has <code>i + j == N-1</code>. Always initialise both dimensions when you declare the array with values.",q:[["Marks of 3 students in 3 subjects are in a 3×3 array. Print each student’s total and each subject’s average.",String.raw`int m[3][3] = {{70,80,90},{60,75,85},{88,92,79}};
for (int i = 0; i < 3; i++) {
    int tot = 0;
    for (int j = 0; j < 3; j++) tot += m[i][j];
    printf("Student %d total = %d\n", i + 1, tot);
}
for (int j = 0; j < 3; j++) {
    int s = 0;
    for (int i = 0; i < 3; i++) s += m[i][j];
    printf("Subject %d avg = %.1f\n", j + 1, s / 3.0);
}`],["A cinema grid of 3 rows × 4 seats stores 1 for occupied, 0 for free. Count occupied seats.",String.raw`int seat[3][4] = {{1,0,1,1},{0,0,1,0},{1,1,1,0}};
int occ = 0;
for (int i = 0; i < 3; i++)
    for (int j = 0; j < 4; j++)
        occ += seat[i][j];
printf("Occupied = %d, Free = %d\n", occ, 12 - occ);`]]},
{d:"Pass 1 pushes the largest value to the last position, pass 2 the next largest, and so on, so each pass can ignore one more element at the end. The swap needs a temporary variable. Worst case it does about n²/2 comparisons, fine for small lists, too slow for large ones. If a full pass makes no swap, the list is already sorted and you can stop early.",q:[["Five exam scores must be ranked highest to lowest. Sort them in descending order.",String.raw`int s[5] = {72, 95, 60, 88, 79};
for (int i = 0; i < 4; i++)
    for (int j = 0; j < 4 - i; j++)
        if (s[j] < s[j + 1]) {          /* < gives descending */
            int t = s[j]; s[j] = s[j + 1]; s[j + 1] = t;
        }
for (int i = 0; i < 5; i++) printf("%d ", s[i]);`],["Six marathon timings (minutes) are stored. Sort ascending and print the winner’s and last runner’s time.",String.raw`int t[6] = {245, 198, 230, 210, 260, 205};
for (int i = 0; i < 5; i++)
    for (int j = 0; j < 5 - i; j++)
        if (t[j] > t[j + 1]) { int x = t[j]; t[j] = t[j + 1]; t[j + 1] = x; }
printf("Winner %d min, last %d min\n", t[0], t[5]);`]]},
{d:"Same problem, two styles. Recursion mirrors the maths and is shorter; iteration is faster and uses constant memory because there are no stack frames. Plain recursive Fibonacci repeats work and takes exponential time, while a loop does it in n steps. Binary search needs a sorted array and halves the range every step, so 1,000,000 items need about 20 comparisons.",q:[["A town’s population doubles every year from 1,000. Find the population after n years using both recursion and a loop.",String.raw`long popRec(int n) { return n == 0 ? 1000 : 2 * popRec(n - 1); }

long popLoop(int n) {
    long p = 1000;
    for (int i = 0; i < n; i++) p *= 2;
    return p;
}
/* popRec(5) == popLoop(5) == 32000 */`],["Check whether a ticket number such as 12321 is a palindrome using a loop.",String.raw`int n = 12321, rev = 0, t = n;
while (t > 0) {
    rev = rev * 10 + t % 10;
    t /= 10;
}
printf(rev == n ? "Palindrome\n" : "Not palindrome\n");`]]},
{d:"<code>break</code> leaves the innermost loop at once; <code>continue</code> skips to the next iteration (in a <code>for</code> the update still runs, in a <code>while</code> you must update before <code>continue</code> or risk an infinite loop). Together they let you handle sentinel values, errors and filters without deep nesting. In a nested loop, <code>break</code> only exits the inner one.",q:[["A scanner reads prices. Skip negative (faulty) prices, stop at price 0 (end of list), and print the total of the valid ones.",String.raw`float p, total = 0;
while (1) {
    scanf("%f", &p);
    if (p == 0)  break;       /* end marker */
    if (p < 0)   continue;    /* ignore bad scan */
    total += p;
}
printf("Total = %.2f\n", total);`],["Find the first number from 1 to 100 divisible by both 7 and 9.",String.raw`for (int i = 1; i <= 100; i++) {
    if (i % 7 == 0 && i % 9 == 0) {
        printf("%d\n", i);        /* 63 */
        break;
    }
}`]]},
{d:"A structure is a custom data type made of named members. <code>typedef</code> lets you drop the <code>struct</code> keyword. Members are reached with <code>.</code>; strings inside a structure must be copied with <code>strcpy</code>, not <code>=</code>. Structures can be assigned to each other as a whole (member-by-member copy). Arrays of structures model tables: students, books, products.",q:[["Store title, price and pages of 3 books and print the costliest.",String.raw`typedef struct { char title[30]; float price; int pages; } Book;
Book b[3] = {{"C Basics", 350, 300}, {"Data Structures", 520, 450}, {"Maths", 410, 380}};
int best = 0;
for (int i = 1; i < 3; i++)
    if (b[i].price > b[best].price) best = i;
printf("%s costs Rs %.0f\n", b[best].title, b[best].price);`],["Create a student structure with a name and 3 marks, and print the average.",String.raw`typedef struct { char name[20]; int m[3]; } Student;
Student s = {"Asha", {80, 70, 90}};
float avg = (s.m[0] + s.m[1] + s.m[2]) / 3.0f;
printf("%s: %.1f\n", s.name, avg);`]]},
{d:"Passing a structure by value copies every member, which is safe but slow for large records. Passing a pointer avoids the copy and lets the function update the original; access members with <code>-></code>. A function can also return a whole structure, or a pointer to an element (and <code>NULL</code> when not found). Splitting a program into <code>read</code>, <code>show</code>, <code>search</code> and <code>update</code> functions is modular programming.",q:[["Give a 10% raise to the employee with a given ID inside an array of employees, by reference.",String.raw`typedef struct { int id; float salary; } Emp;

void giveRaise(Emp *e) { e->salary *= 1.10f; }

int main(void) {
    Emp a[3] = {{101, 30000}, {102, 40000}, {103, 35000}};
    for (int i = 0; i < 3; i++)
        if (a[i].id == 102) giveRaise(&a[i]);
    printf("%.0f\n", a[1].salary);   /* 44000 */
}`],["A shop sells units of a product. Write a function that takes a Product and units sold and returns the updated Product.",String.raw`typedef struct { int code; int stock; } Product;

Product sell(Product p, int units) {
    if (units <= p.stock) p.stock -= units;
    return p;
}

int main(void) {
    Product x = {7, 50};
    x = sell(x, 12);
    printf("%d left\n", x.stock);   /* 38 */
}`]]},
{d:"The stack holds fixed-size variables; the heap lets you request memory at run time. <code>malloc</code> returns a pointer to uninitialised bytes (or <code>NULL</code> if memory is exhausted), <code>calloc</code> zero-fills, <code>realloc</code> resizes and may move the block, and <code>free</code> returns it. After <code>free</code>, set the pointer to <code>NULL</code>. Forgetting to free causes a memory leak; using memory after free is a serious bug.",q:[["Read n and then n daily expenses into a dynamically allocated array. Print the total and free the memory.",String.raw`int n; scanf("%d", &n);
int *e = malloc(n * sizeof(int));
if (e == NULL) return 1;
int total = 0;
for (int i = 0; i < n; i++) { scanf("%d", &e[i]); total += e[i]; }
printf("Total = %d\n", total);
free(e);`],["In an election with 4 candidates, use calloc for the vote counts, record some votes and print the tally.",String.raw`int *v = calloc(4, sizeof(int));      /* all start at 0 */
int ballots[6] = {1, 3, 1, 0, 2, 1};
for (int i = 0; i < 6; i++) v[ballots[i]]++;
for (int i = 0; i < 4; i++) printf("Candidate %d: %d\n", i, v[i]);
free(v);`]]},
{d:"The cycle is <code>fopen</code> → check for <code>NULL</code> → read or write → <code>fclose</code>. Mode <code>\"w\"</code> erases an existing file, <code>\"a\"</code> appends. Loop on the return value of <code>fscanf</code> or <code>fgets</code> rather than on <code>feof</code> alone, because <code>feof</code> turns true only after a read has failed. Always close files so buffered data is actually written to disk.",q:[["Write 3 student names to students.txt, then read the file back and print each line.",String.raw`FILE *f = fopen("students.txt", "w");
fprintf(f, "Asha\nRavi\nMeena\n");
fclose(f);

char line[50];
f = fopen("students.txt", "r");
while (fgets(line, sizeof line, f))
    printf("%s", line);
fclose(f);`],["marks.txt holds one mark per line. Read until the end of file and print the average.",String.raw`FILE *f = fopen("marks.txt", "r");
if (f == NULL) { printf("File not found\n"); return 1; }
int m, n = 0, sum = 0;
while (fscanf(f, "%d", &m) == 1) { sum += m; n++; }
fclose(f);
if (n) printf("Average = %.2f\n", (float)sum / n);`]]}
];
D[11].q.push(["Write countFrequency(int arr[], int n, int x) that returns how many times a roll number x appears in a list of attendance records.",String.raw`int countFrequency(int arr[], int n, int x) {
    int c = 0;
    for (int i = 0; i < n; i++)
        if (arr[i] == x) c++;
    return c;
}

int main(void) {
    int a[8] = {5, 3, 5, 9, 5, 3, 1, 9};
    printf("%d\n", countFrequency(a, 8, 5));   /* 3 */
}`]);
D[12].q.push(["Write mergeStrings(s1, s2, result) that joins a first name and a last name into a full name using loops only (no string.h functions).",String.raw`void mergeStrings(char s1[], char s2[], char result[]) {
    int i = 0, j = 0;
    while (s1[i] != '\0') { result[i] = s1[i]; i++; }
    result[i++] = ' ';
    while (s2[j] != '\0') result[i++] = s2[j++];
    result[i] = '\0';
}

int main(void) {
    char full[40];
    mergeStrings("Ada", "Lovelace", full);
    printf("%s\n", full);   /* Ada Lovelace */
}`]);
D[18].q.push(["Compare the cost of recursion and iteration: count how many recursive calls fib(10) makes and how many loop iterations the iterative version needs.",String.raw`int calls = 0;
int fib(int n) { calls++; return n < 2 ? n : fib(n - 1) + fib(n - 2); }

int main(void) {
    int n = 10, r = fib(n);
    printf("fib(%d) = %d, recursive calls = %d\n", n, r, calls);   /* 177 */

    int a = 0, b = 1, iter = 0;
    for (int i = 2; i <= n; i++) { int t = a + b; a = b; b = t; iter++; }
    printf("fib(%d) = %d, loop iterations = %d\n", n, b, iter);    /* 9 */
}`]);
D[22].q.push(["A to-do app starts with room for 2 task IDs and grows by 2 whenever it is full. Add task IDs 101 to 105 using realloc and print the list.",String.raw`int cap = 2, n = 0;
int *list = malloc(cap * sizeof(int));
for (int id = 101; id <= 105; id++) {
    if (n == cap) {
        cap += 2;
        list = realloc(list, cap * sizeof(int));
    }
    list[n++] = id;
}
for (int i = 0; i < n; i++) printf("%d ", list[i]);
printf("\n(capacity %d)\n", cap);
free(list);`]);
const det=document.createElement("div");det.id="detail";document.body.appendChild(det);
document.querySelectorAll(".hero,.mq,#main,.end").forEach(e=>e.classList.add("home"));
let cur=-1;const baseTitle=document.title;
const cb=(f,c,o)=>`<div class="cb"><div class="h"><i></i><i></i><i></i><span>${f}</span></div><pre>${hl(c)}</pre>${o?`<div class="out">${esc(o)}</div>`:""}</div>`;
function render(i){
 const d=T[i],x=D[i],n=String(i+1).padStart(2,"0"),pv=T[i-1],nx=T[i+1];
 document.title=d.t.replace(/<[^>]+>/g,"").replace(/&amp;/g,"&")+" — C Programming";
 det.innerHTML=`<article class="dp"><a class="back" href="#c${n}">← All chapters</a>
 <div class="tag" style="margin-top:34px">Chapter ${n} / ${T.length} — ${d.tag}</div><h1>${d.t}</h1>
 <h3>The concept</h3><p>${d.p}</p><p>${x.d}</p><ul class="pts">${d.pts.map(p=>`<li>${p}</li>`).join("")}</ul>
 <h3>Worked example</h3>${cb(d.f,d.code,d.out)}
 <h3>Practice — real-life scenarios</h3><p>Try each one on paper or in your compiler first. Answers are shown as the code you would put in <code>main()</code> (with the usual <code>#include</code> lines).</p>
 ${x.q.map((q,k)=>`<div class="qq"><div class="tag">Scenario ${k+1}</div><p>${q[0]}</p><button class="sa" data-k="${k}" aria-expanded="false">Show answer</button><div class="ans" hidden></div></div>`).join("")}
 <div class="pn">${pv?`<a href="#/c/${i}">← ${String(i).padStart(2,"0")} ${pv.tag.split(" · ")[1]}</a>`:"<span></span>"}${nx?`<a href="#/c/${i+2}">${String(i+2).padStart(2,"0")} ${nx.tag.split(" · ")[1]} →</a>`:"<span></span>"}</div>
 <p class="cred">Made by <a href="https://github.com/Ajlikeadj" target="_blank" rel="noopener">Ajlikeadj</a></p></article>`;
 det.onclick=e=>{const b=e.target.closest(".sa");if(!b)return;const a=b.nextElementSibling;
  if(!a.innerHTML)a.innerHTML=cb("answer.c",x.q[+b.dataset.k][1]);
  const show=a.hidden;a.hidden=!show;b.textContent=show?"Hide answer":"Show answer";b.setAttribute("aria-expanded",show)};
}
function route(){
 const m=location.hash.match(/^#\/c\/(\d+)$/);
 if(!m){if(cur>=0){document.body.classList.remove("d");det.innerHTML="";document.title=baseTitle;
   const s=document.getElementById("c"+String(cur+1).padStart(2,"0"));cur=-1;if(s)s.scrollIntoView({behavior:"instant"})}return}
 const i=+m[1]-1;if(!T[i])return;
 cur=i;document.body.classList.add("d");render(i);scrollTo({top:0,behavior:"instant"});
}
addEventListener("hashchange",route);route();
