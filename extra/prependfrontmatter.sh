i=1
j='i'
while IFS= read -r line; do
	sed -i "$i$j$line" $2
	i=`expr $i + 1`
done < $1

#./script.sh frontmatter.txt Plugin.md
