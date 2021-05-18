ctype= input("Would you like to convert M to KM(M) or KM to M (K)") #PLEASE ENTER 'K' for KM to M or 'M' for M to KM
if ctype == "K":
  print("KM TO M SELECTED")
  KL= input("ENTER THE NUMBER OF KILOMETERS (WHOLE NUMBERS ONLY)")
  KANS = int(KL)/0.621371
  print(KL, " KILOMETRES IS ", KANS, " MILES (APPROX)") #verrrry slightly off
if ctype == "M":
  print("M TO KM SELECTED")
  ML = input("ENTER THE NUMBER OF MILES (WHOLE NUMBERS ONLY)")
  MANS = int(ML)*1.60934
  print(ML, " MILES IS ", MANS, " KILOMETERS" )
