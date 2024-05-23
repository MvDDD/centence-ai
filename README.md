# Sentence AI: N-gram Prediction Program

Sentence AI is a simple prediction program designed to facilitate learning and understanding of basic predictions on extremely large datasets. This type of prediction method is known as "N-gram prediction" or "data windowing prediction."

In N-gram prediction, the program utilizes a "window" — a frame typically 20 characters long — which slides across all sentences in the dataset. It saves the data of each slice and counts the occurrences of each slice.

After the training sequence, the program initiates the generation process with five parameters:
- <start : string>: The starting string, for example, "hello".
- <maxlength : int>: The maximum length of the generated string.
- <overlap : int, min:1, max:19>: The number of characters overlapped between adjacent slices.
- <filllength: int, min:1, max:(20 - overlap)>: The length of characters filled in each iteration.
- <amount : int>: The number of strings to generate.

The generation process begins by starting a string with "<start" and slicing the last <overlap> characters of the string. Then, it filters the dataset based on slices using the startsWith() function. The filtered results are formatted as "{string:{count:<>}}".

Next, a random value is added to all count values, ranging between 0 and the maximum count value. The program selects the slice with the highest count, removes the first <overlap> characters, and adds the first <filllength> characters of the remaining string. This process continues iteratively until the total string length exceeds <maxlength>.

The program is currently trained on 207 different sentences, but new suggestions for sentences are always welcome.

Feel free to suggest new sentences or explore the capabilities of Sentence AI in generating predictions based on the provided parameters.
