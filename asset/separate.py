############## COUNT THE WORDS #################
# easycount = 0
# hardcount = 0
# with open('words.txt') as f:
#     for line in f.readlines():
#         print(line.strip())
#         if len(line) < 7:
#             easycount += 1
#         if len(line) > 6:
#             hardcount += 1


#     print('easycount = ' + str(easycount))
#     print('hardcount = ' + str(hardcount))
################################################
import json

outshort = open('easy.json', 'w')
outlong = open('hard.json', 'w')
# medium has 298 easy words and 1353 medium words
# easy has 897 easy words and 452 hard words

easyCounter = 897
hardCounter = 452
easyArr = []
hardArr = []

with open('words.txt') as f:
    for line in f.readlines():
        if len(line) < 7 and len(line) > 1:
            if easyCounter <= 0:
                hardArr.append(line.strip().lower())
                continue
            easyArr.append(line.strip().lower())
            easyCounter -= 1
        if len(line) > 6:
            if hardCounter <= 0:
                hardArr.append(line.strip().lower())
                continue
            easyArr.append(line.strip().lower())
            hardCounter -= 1

# with open('words.txt') as f:
#     for line in f.readlines():
#         print(line)
#         if len(line) < 7 and len(line) > 1:
#             easyArr.append(line.strip().lower())
#         if len(line) > 6:
#             hardArr.append(line.strip().lower())
            
outshort.write(json.dumps(easyArr))
outlong.write(json.dumps(hardArr))
outshort.close()
outlong.close()
f.close()


